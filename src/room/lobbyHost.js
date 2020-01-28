import React, {Component} from "react";
import Room from './room';
import Test from './test';

var T1 = null;
const STEAM_JOIN_DE = "steam://joinlobby/813780/";

class LobbyHost extends Component {
    constructor(props) {
        super(props);
        this.state = {active: false};
        this.hostLobby = this.hostLobby.bind(this);
        this.hostingButton = this.hostingButton.bind(this);
        this.exitLobby = this.exitLobby.bind(this);
    }


    hostLobby() {
        if (!this.state.active) {
            this.setState({active: true});  
        }

        var Test1 = new Test("4v4 1800", "Ghazna");
        T1 = Test1;
    }

    exitLobby() {
        if (this.state.active) {
            this.setState({active: false});
        }
        console.log(T1.getAge());
    }

    hostingButton() {
        console.log(T1.name);
        return (
            <div>
                <Room room={T1}/>
            
            </div>
        )  
    }
    

    render() {
        if (!this.state.active) {
            return (
                <div className="player-card App-card shadow-sm">
                <br></br>
                <button onClick={this.hostLobby} className="btn btn-warning">Host Lobby</button>
                </div>
                )
        } else {
            return (
                <div className="player-card App-card shadow-sm">
                <br></br>
                <button onClick={this.exitLobby} className="btn btn-warning">Exit Lobby</button>
                
                {this.hostingButton()}
                </div>
                
            )
        }
        
    }
}


export default LobbyHost;