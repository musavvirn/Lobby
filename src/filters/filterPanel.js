import React, {Component} from "react";
import Filter from "./filter";
import LobbyService from '../services/lobbyService';
import "./filterPanel.css";
import {SearchFilter} from "./searchFilter";

var lobbyService = new LobbyService();

const modes = ["All", "Random Map", "Regicide", "Death Match", "Sudden Death", "King of the Hill", "Scenario"];
const dataset = ["All", "DE", "Custom"];
const maps = ["All", "Arabia", "Arena", "Black Forest", "Nomad", "Gold Rush", "Coastal", "Other Maps"];

const ELO = [0, 800, 1000, 1400, 1600, 1800];
const solo = ["All", "1v1", "Team Games"];

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    render() {
        return (
            <div className="player-card App-card shadow-sm">
                <h6 className="container-title"> Filters </h6>
                <Filter name="Game Mode" items={modes} id={1}/>
                <Filter name="Data Set" items={dataset} id={2}/>
                <Filter name="Map" items={maps} id={3}/>
                <Filter name="ELO" items={ELO} id={4}/>
                <Filter name="Team Game?" items={solo} id={5}/>
                <div className="filter-bottom">
                    <SearchFilter id={6}/>
                    <button onClick={this.clicked} className=" btn btn-outline-primary btn-reset">Reset</button>
                </div>

            </div>
        )
    }

    //resets all filters to All
    clicked(event) {
        lobbyService.resetFilters();

    }
}

export default FilterPanel;