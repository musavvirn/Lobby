import React, { Component } from 'react';
import STEAM_LOGO from './steam_login_img.png';
import './login.css'

class Steam extends Component {
    constructor(props) {
        super(props);
        this.stte = {login: false, steamId: null, name: null};
    }

    handleClick() {
      let id = "";
      let name = "";
      this.setState({login: true, steamId: id, name: name})
    }

    render() {
        return (
            <div className="steam">
            <img src={STEAM_LOGO} alt="STEAM LOGIN IMG"></img>  
            </div>
        )
    }
}


    

export default Steam;


