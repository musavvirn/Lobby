import React, {Component} from "react";
import Steam from './steam';
import "./login.css";

class Login extends Component {
    render() {
        return (
            
            <div className="login player-card card App-card shadow-sm">
                {/* <input  placeholder="username"></input>
                <input type="password" placeholder="password"></input>
                <button className="btn btn-outline-warning btn-login"> Login </button>
                <button className="btn btn-outline-danger btn-forgot"> Forgot Password ? </button> */}
                <Steam />
            </div>
        )
    }
}


export default Login;
