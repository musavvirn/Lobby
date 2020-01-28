import React, {Component} from "react";
import "./profileInfo.css";
import ProfileService from "../services/profileService";

const newPlayer = new ProfileService();

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var p = newPlayer.getPlayer();
        return(
            <div className="player-card App-card shadow-sm">
                <p className="name">
                Player: PLACEHOLDER NAME <br></br>
                Rating(1v1): {p.elo}<br></br>
                Total Games: {p.games}<br></br>
                Win Rate: {p.winRate}<br></br>
                Games Played Today: {p.todayGames}<br></br>
                Status: {p.onlineStatus}
                </p>
            </div>
        )
    }

}

export default ProfileInfo;