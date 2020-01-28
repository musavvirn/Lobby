import React, {Component} from 'react';
import PlayerService from '../services/playerService';
import NotificationService, { NOTIF_PLAYERLIST_REQUEST } from '../services/notificationService';
import './playerList.css';

// players: ["Alice", "Bot_s", "[Qus]sd2", "_klavs"]

// var instance = null;
var notifService = new NotificationService();
var playerService = new PlayerService();

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {players: []};
        this.updatePlayers = this.updatePlayers.bind(this);
        this.hoverInfo = this.hoverInfo.bind(this);
        this.formatName = this.formatName.bind(this);
    }

    componentDidMount() {
        notifService.addObserver(NOTIF_PLAYERLIST_REQUEST, this, this.updatePlayers);
    }

    componentWillUnmount() {
        notifService.removeObserver(this, NOTIF_PLAYERLIST_REQUEST);
    }

    updatePlayers(players) {
        this.setState({players: players});
    }

    render() {
        if (true) {
            return (    
                <div className="shadow-sm App-card player-card playerCard p-list">
                    Player List:
                    <hr></hr>
                    {this.displayPlayer()}
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    //displays player list of a lobby
    displayPlayer() {
        var list = this.state.players.map((player) =>
            <div key={player.profile_id}>
                <button className="btn btn-outline-success tick"
                onClick={this.addFriend.bind(this, player)}><span>&#10003;</span></button>
                <span></span>
                <button name={player.name} className="btn btn-outline-warning player-btn"
                onMouseOver={this.hoverInfo}
                onMouseLeave={this.hideInfo}>{" (" + player.rating + ") " + player.name}</button>
                
            </div>
        )
        return (list);
    }

    formatName(name) {
        //exclude elo from name string
        if (!name.includes("AI Player")) {
            // var name2 = name.substring(name.indexOf("]")+2, name.length);
            // return name2;
            return name;
        } else {
            return <i>AI</i>;
        }
    }

    addFriend(player) {
    }
    
    //sends hoverd player to playerServices
    hoverInfo(event) {  
        console.log(event.target.name);
        var p = this.state.players.find((x) => x.name === event.target.name);
        playerService.updateInfo(p);
        
    }

    //sends null info upon unhovering
    hideInfo() {
        // playerService.updateInfo(null);
    }

}

export default PlayerList;