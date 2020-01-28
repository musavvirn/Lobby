import React, {Component} from "react";
import LobbyService from '../services/lobbyService';
import './room.css';
import Test from './test';

const newLobby = new LobbyService();
const STEAM_JOIN_DE = "steam://joinlobby/813780/";

var PLIST = [  {persona: "Ghazna", steamid: 812739023, elo: 1700},
                    {persona: "Xeds", steamid: 8213091, elo: 1723},
                    {persona: "ABC", steamid: 7912308, elo: 1300},
                    {persona: "MrYo", steamid: 98724, elo: 1299},
                    {persona: "Lyx", steamid: 12893, elo: 1572},
                    {persona: "Lyx", steamid: 19220, elo: 1572}
                ];

const MODE = ["Random Map", "Death Match", "Regicide", "King of The Hill", "Sudden Death", "Scenario"]
const MAP = ["Arabia", "Arena", "Nomad", "Black Forest", "Steppe", "Coastal", "Fortress", "Hideout", "Rivers", "Oasis", "MegaRandom", "Bog Islands"]
const SLOTS = [8,7,6,5,4,3,2];

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {  
                        hostId: null,
                        hostName: this.props.room.host,
                        players: PLIST,
                        elo: null,
                        name: this.props.room.name,
                        mode: null,
                        map: null,
                        current: 0,
                        slots: 8,
                        teamGame: null,
                        password: null,
                        join: "", 
                        disabled: true,
                        idle: false
                    };
        this.grabLobby = this.grabLobby.bind(this);
        this.autoJoin = this.autoJoin.bind(this);
        this.generateSlots = this.generateSlots.bind(this);
        this.generateOption = this.generateOption.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.setElo = this.setElo.bind(this);
        this.slotSelected = this.slotSelected.bind(this);
    }

    componentDidMount() {
        this.setState({current: this.current(), elo: this.setElo()});
        this.setPlayers();
        console.log(this.props.room.name)
        
    }

    componentDidUpdate() {
        this.verifyPlayers();
        
    }

    setPlayers() {
        this.setState({players: PLIST});
    }

    verifyPlayers() {
        // check there is no duplicates
    }

    current() {
        return this.state.players.length;
    }

    setElo() {
        let sum = 0; 
        let count = 0;
        this.state.players.map(player => {
            sum += parseInt(player.elo);
            count++;
        });

        let avg = (sum === 0) ? 0: (sum / count).toFixed(0);
        return avg;
    }

    autoJoin() {
        if (this.state.active === "active") {
            console.log("joining...");
            window.open(this.state.join);
        } else {
            console.log("not auto joining");
        }
    }

    

    async grabLobby() {
        let x = await newLobby.getLobbyId(this.props.id);
            if (x !== null) {
                this.setState({join: STEAM_JOIN_DE + await x, disabled: false});
                console.log(this.state.join);
            } else {
                console.log("Lobby not found!");
                setTimeout(() => {this.autoJoin();}, 2000);
            }
    }

    player(list) {
        list.forEach(element => {
            
        });
    }

    removePlayer(event) {
        let list = this.state.players;
        for(let i=0; i<list.length; i++) {
            if (list[i].steamid == event.target.value) {
                list.splice(i,1);
                break;
            }
        }
        this.setState({players: list, current: this.current(), elo: this.setElo()});
        
    }

    slotSelected(event) {
        let x = event.target.value;
        let list = this.state.players.slice(0, x);
        this.setState({slots: x, players: list});
        setTimeout(() => this.setState({current: this.current(), elo: this.setElo()}), 0); 
    }

    generateOption(x) {
        let i = 0;
        return x.map((value) => {
            i++;
            return <option key={i} value={value} className="opt">{value}</option>;
        }); 
    }

    generateSlots(list) {
        
        let slot = list.map((player) => 
            <div key={player.steamid} className="slot-row">
                <button onClick={event =>  window.location.href="steam://friends/add/" +player.steamid} value={player.steamid} className="btn btn-outline-success tick"><span>&#10003;</span>
                </button>               
                <span></span>
                <button value={player.steamid} className="btn btn-outline-warning player-btn" 
                onMouseOver={this.hoverInfo} 
                onMouseLeave={this.hideInfo}>
                {"[" + player.elo + "] " + player.persona}  
                </button>
                <button onClick={this.removePlayer} value={player.steamid} className="btn btn-outline-danger tick">&#10006;
                </button> 
            </div>
        )
        return (slot);
    }

    space() {
        return (
            <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</  >
        )
    }

    render() {
        return (
            <div className="player-card App-card shadow-sm room">
                <p className="title">Title: {this.state.name} {this.space()} {this.state.current + " / " + this.state.slots}</p>
                
                <div className="settings">
                Mode: &nbsp; 
                <select className="border-white shadow" value={this.state.value}>
                    {this.generateOption(MODE)}
                </select>
                {this.space()}

                Map: &nbsp; 
                <select className="border-white shadow" value={this.state.value}>
                    {this.generateOption(MAP)}
                </select>
                {this.space()}
                ELO: &nbsp; {this.state.elo}
                {this.space()}

                Slots: &nbsp;
                <select className="border-white shadow" value={this.state.value} onChange={this.slotSelected}>
                    {this.generateOption(SLOTS)}
                </select>
                </div>

                
                {this.generateSlots(this.state.players.slice(0,4))}
                {this.generateSlots(this.state.players.slice(4,8))}
                <p></p>
                <button onClick={this.grabLobby} className="btn btn-warning">Get Lobby</button>
                <button onClick={this.autoJoin} className="btn btn-primary" disabled={this.state.disabled}>Join Game</button>
                
            </div>
        )
    }
}

export default Room;