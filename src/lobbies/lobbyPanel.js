import React, {Component} from "react";
import LobbyService from '../services/lobbyService';
import PlayerService from '../services/playerService';
import NotificationService, { NOTIF_LOBBY_UPDATED } from '../services/notificationService';
import './lobbies.css';
const HD_APP_ID = 221380;
const DE_APP_ID = 813780;
const INTERVAL = 1000000;

var notifService = new NotificationService();
var lobbyService = new LobbyService();
var playerService = new PlayerService();

class LobbyPanel extends Component {
    // lobbyService.resetFilters();
    constructor(props) {
        super(props);
        this.state = {lobbies: this.setLobbies()};
        this.onFilterChanged = this.onFilterChanged.bind(this);
        this.createLobbies = this.createLobbies.bind(this);  
        this.setLobbies = this.setLobbies.bind(this);
    }

    setLobbies() {
        let x = [];
        (async () => {
            x = await lobbyService.getAllLobby();
            this.setState({lobbies: x});
          })()
        return x;
    }
    
    componentDidMount() {
        this.setLobbies();
        this.interval = setInterval(this.setLobbies.bind(this), INTERVAL);
        notifService.addObserver(NOTIF_LOBBY_UPDATED, this, this.onFilterChanged);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        notifService.removeObserver(this, NOTIF_LOBBY_UPDATED);
    }

    onFilterChanged(lobbyList) {
        this.setState({lobbies: lobbyList});
    }

    //checks if lobby is full and renders join/full button with steam join link
    fullLobby(lobby) {
        if (lobby.started === null) {
            return (<td><button onClick={event =>  window.location.href="steam://joinlobby/" + DE_APP_ID + "/" + lobby.lobby_steam_id} className=" btn btn-warning btn-join row-btn">Join</button></td>);   
        } else {
            return (<td><button disabled className="btn btn-dark disabled btn-full row-btn">Full</button></td>);
        }
    }

    

    //send player list of a lobby to playerServices
    listPlayers(players) {
        playerService.getPlayerInfo(this);   
    }

    //create a lobby row
    createLobbies() {
            // console.log(this.state.lobbies);
            console.log (this.state.lobbies);
            const list = this.state.lobbies.map((lobby) => 
            <tr className="rows" key={lobby.lobby_steam_id}>
                {/* <td className="row-id">{".... " +lobby.id.toString().substring(lobby.id.toString().length-4,lobby.id.toString().length-1)}</td> */}
                <td className="row-exp">{this.isCustomDataSet(lobby.has_custom_content)}</td>
                <td className="row-name">{lobby.name}</td>
                <td className="row-type">{this.gameType(lobby.game_type)}</td>
                <td className="row-map">{this.mapType(lobby.map_type)}</td>
                {this.fullLobby(lobby)}
                
                <td className="row-slot"><button className="btn btn-outline-warning btn-slot"
                onClick={this.listPlayers.bind(lobby.players)}>{lobby.num_players.toString()+"/"+lobby.num_slots.toString()}</button></td>
                <td className="row-elo">{lobby.average_rating}</td> 
            </tr>
        );
        return (list);
    }

    rowHover() {
        return <div>asdasdasds</div>
    }
    
    calcELO(pList) {
        var eList = [];
        pList.forEach(p => {
            if (p.name[0] === "[") {
                var e = p.name.substring(1, p.name.indexOf("]"));
                eList.push((parseInt(e)));
            }   
        });

        var eSum = 0;
        eList.forEach(e => {
            eSum += e;
        });

        if (eList.length !== 0) {
            var eAvg = (eSum / eList.length).toFixed(0);
            return eAvg;
        } else {
            return "";
        }
    }

    isCustomDataSet(b) {
        return ((b === null) ? "DE" : "Custom");
    }
    
    mapType(id) {
        let map = "";
        switch (id) {
            case 29:
                map = "Arena";
                break;
                case 12: 
                map = "Black Forest";
                break;
                case 9: 
                map = "Arabia";
                break;
                case 13: 
                map = "Coastal";
                break;
                case 14: 
                map = "Continental";
                break;
                case 17: 
                map = "Gold Rush";
                break;
                case 33: 
                map = "Nomad";
                break;
            default:
                map = "Other Maps";
        }

        return map;
    }

    gameType(i) {
        var mode ="";
        switch (i) {
                case 0:
                mode = "Random Map";
                break;
                case 1:
                mode = "Regicide";
                break;
                case 2:
                mode = "Death Match";
                break;
                case 3:
                mode = "Scenario";
                break;
                case 11:
                mode = "Sudden Death";
                break;
                case 6:
                mode = "King of The Hill";
                break;
            default:
                mode = "";
        }
        return mode;
    }

    render() {  
        return (    
            <div className="panel">
            <table className="table lobbies table-hover">
                
                {/* setting width of lobby columns */}
                {/* <col width="10 px"></col>
                <col width="150 px"></col>
                <col width="10 px"></col>
                <col width="100 px"></col>
                <col width="10 px"></col>
                <col width="100 px"></col> */}  

                <thead>
                <tr className="rows">
                    {/* <th>Game ID</th> */}
                    <th className="container-title">Data Set</th>
                    <th className="container-title">Name</th> 
                    <th className="container-title">Mode</th>
                    <th className="container-title">Map</th>
                    <th className="row-join container-title">Join</th>
                    <th className="container-title">Players</th>
                    <th className="container-title">Rating (Avg)</th>
                    
                </tr>
                </thead>
                <tbody>
                {this.createLobbies()}
                </tbody>
                
            </table>
            
            </div>
        )
    }
}

export default LobbyPanel;
