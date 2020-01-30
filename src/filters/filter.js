import React, {Component} from "react";
import "./filter.css";
import LobbyService from '../services/lobbyService';
import NotificationService3, { NOTIF_FILTER_RESET } from '../services/notificationService';

var lobbyService = new LobbyService();
var notifService3 = new NotificationService3();
//default value of all filters
const all = "All";

class Filter extends Component {
    
    constructor(props) {
        super(props);
        this.state = {value: all, name: this.props.name, id: this.props.id};
        this.selected = this.selected.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    componentDidMount() {
        notifService3.addObserver(NOTIF_FILTER_RESET, this, this.reset);
    }

    componentWillUnmount() {
        notifService3.removeObserver(this, NOTIF_FILTER_RESET);
    }

    reset() {
        this.setState({value: all});
    }


    render() {

        const x = this.props.items; 
        return (
            <div className="filter">
                <p> {this.props.name} 
                <select className="border-white shadow" value={this.state.value} onChange={this.selected}>
                    {this.generateOption(x)}
                </select>
                
                </p>
            </div>
        )
    }

    selected(event) {
        this.setState({value: event.target.value});
        console.log(event.target.value);
        lobbyService.filterLobby(this.state.id, event.target.value);
    }

    generateOption(x) {
        let i = 0;
        return x.map((value) => {
            i++;
            return <option key={i} value={value} className="opt">{value}</option>;
        }); 
    }
}




export default Filter;


