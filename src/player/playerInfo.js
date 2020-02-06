import React, {Component} from 'react';
import NotificationService2, { NOTIF_PLAYER_INFO_REQUEST } from '../services/notificationService';
// import PlayerService from '../services/playerService';

var notifService2 = new NotificationService2();
// var playerService = new PlayerService();

class PlayerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {on: false, info: {}};
        this.onPlayerHovered = this.onPlayerHovered.bind(this);
    }

    componentDidMount() {
        notifService2.addObserver(NOTIF_PLAYER_INFO_REQUEST, this, this.onPlayerHovered);
    }

    componentWillUnmount() {
        notifService2.removeObserver(this, NOTIF_PLAYER_INFO_REQUEST);
    }

    onPlayerHovered(player) {
        if (player !== null) {
            this.setState({on: true, info: player});
        } else {
            this.setState({on: false, info: player});
        }
    }

    
    render () {
        if (this.state.on) {
            return (
                <div className="App-card player-card playerCard">
                        <p className="name">
                            <h6 className="container-title"> Player Info </h6>
                            Name: <span></span> {this.state.info.name} <br></br>
                            Rating (1v1): <span></span> {this.state.info.rating} <br></br>
                            Games Played Today: <br></br>
                            Total Games: {this.state.info.games}<br></br>
                            Wins: {this.state.info.wins}<br></br>
                            {/* <a className="steam-interact btn btn-primary" href={"https://steamcommunity.com/profiles/" + this.state.info.steam_id}> Steam Profile </a> */}
                            <a className="steam-interact btn btn-outline-primary" href={"steam://friends/add/" + this.state.info.steam_id}> Add Friend </a>
                            <a className="steam-interact btn btn-outline-primary" href={"steam://friends/message/" + this.state.info.steam_id}> Message </a>
                            
                        
                        </p>

                </div>
            )
        } else {
            return null;
        }
    }
    
}

export default PlayerInfo;