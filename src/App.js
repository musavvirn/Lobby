import React, {Component} from 'react';
import './App.css';
import Login from './profile/login';
import Room from './room/room';
import ProfileInfo from './profile/profileInfo';
import Steam from './profile/steam';
import LobbyService from './services/lobbyService';
import ProfileService from './services/profileService';
import PlayerList from './player/playerList';
import PlayerInfo from './player/playerInfo';
import FilterPanel from './filters/filterPanel';
import LobbyPanel from './lobbies/lobbyPanel'
import LobbyHost from './room/lobbyHost';

// const HD_APP_ID = 221380;
// const DE_APP_ID = 813780;

const newPlayer = new ProfileService();
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {player: []};
    this.getPlayerInfo = this.getPlayerInfo.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.getPlayerInfo();
  }

    
  getPlayerInfo = () => {
    var self = this;
    // newPlayer.getPlayer().then(data => {
    //   self.setState({player: data});
    //   return self.state.player;
    // }, err => {
    // });

    self.setState({player: newPlayer.getPlayer()})
    console.log(self.state.player);
  }

  createPlayer = () => {
    return (
      <ProfileInfo id={this.state.player.id} name={this.state.player.name} elo={this.state.player.elo} totalMatches={this.state.player.games} winrate={this.state.player.winRate} todayMatches={this.state.player.todayGames} dateRegistered={this.state.player.dateRegistered} onlineStatus={this.state.player.onlineStatus}/>
    )
  }

  render() {
    return (
      <div className="App">
        <div>
            <h4> LOBBY BROWSER </h4>
          </div>
          <div className="shadow-lg container">
            
            {this.createPlayer()}
            {/* <Steam /> */}
            {/* <LobbyHost /> */}
            <FilterPanel />
            <PlayerList />
            <PlayerInfo />
            {/* <Login/>  */}
            
          </div>
          
          <div className="shadow-lg">      
            <LobbyPanel />
          </div>
      </div>
      );
  }
}



export default App;
