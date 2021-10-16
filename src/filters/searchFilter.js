import React, {Component} from "react";
import {NOTIF_FILTER_RESET} from "../services/notificationService";
import NotificationService3 from '../services/notificationService';
import LobbyService from '../services/lobbyService';

var lobbyService = new LobbyService();
var notifService3 = new NotificationService3();

export class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {value: "", id: 6};
        this.reset = this.reset.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }

    componentDidMount() {
        notifService3.addObserver(NOTIF_FILTER_RESET, this, this.reset);
    }

    componentWillUnmount() {
        notifService3.removeObserver(this, NOTIF_FILTER_RESET);
    }

    reset() {
        this.value = null;
        this.setState({value: ""});

    }

    render() {
        return (
            <form onChange={this.handleInput}>
            <input type="search" placeholder={this.state.value}  aria-describedby="button-addon1"
                      className="form-control search-box border-0 bg-light"></input>
                </form>
        )
    }

    handleInput(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
        lobbyService.filterLobbyBySearch(this.state.id, this.state.value);
    }




}