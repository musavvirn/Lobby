import 'whatwg-fetch';
import {Component} from 'react';
import NotificationService, { NOTIF_LOBBY_UPDATED } from '../services/notificationService';
import NotificationService3, { NOTIF_FILTER_RESET } from '../services/notificationService';



var instance = null;
var allLobby = [];
var filteredLobbyList = [];
var notifService = new NotificationService();
var notifService3 = new NotificationService3();
//default value of all filter types
const all = "All";
const filters = {mode: all, dataset: all, map: all, elo: 0, solo: all, search:""};

class LobbyService extends Component{
    //single instance of lobbies
    constructor(props) {  
        super(props);   
        if (!instance) {
            instance = this;
            this.getAllLobby = this.getAllLobby.bind(this);
            this.filterLobby = this.filterLobby.bind(this);    
            this.resetFilters = this.resetFilters.bind(this); 
            this.fetchLobby = this.fetchLobby.bind(this);
            this.getMapName = this.getMapName.bind(this);
            this.getL = this.getL.bind(this);
        }
        return instance;
    }

    setAllLobby() {
        allLobby = this.getAllLobby();
    }

    getL() {
        console.log(allLobby);
        return allLobby;
    }

    filterLobby(id, filter) {
        filteredLobbyList = [];
        //case id represents each filter, top to bottom
        this.setFilter(filter, id);
        (async () => {
            allLobby = await this.getAllLobby();
        })();
        allLobby.forEach(l => this.applyFilter(l));
        notifService.updateNotif(NOTIF_LOBBY_UPDATED, filteredLobbyList);
    }



    applyFilter(l) {
        if (
            (filters.dataset === all ||
            ((filters.dataset === "DE") && (l.has_custom_content === null)) ||
            ((filters.dataset === "Custom") && (l.has_custom_content !== null))) &&
            (filters.mode === all || this.getMode(l.game_type) === filters.mode) &&
            (filters.map === all || this.getMapName(l.map_type) === filters.map) &&
            (filters.solo === all ||
                ((filters.solo === "1v1") && (l.num_slots === 2)) ||
                ((filters.solo === "Team Games") && l.num_slots > 2)) &&
            (filters.elo === "0" || l.average_rating >= filters.elo)) {

                filteredLobbyList.push(l);
            }

    }

    /* Apply's search box value to lobby title */
    applySearchFilter(l) {
        if (l.name.toLowerCase().includes(filters.search.toLowerCase())){
            filteredLobbyList.push(l);
        }

    }

    setFilter(filter, id) {
        switch (id) {
            case 1: 
            filters.mode = filter;
            break;
            case 2: 
            filters.dataset = filter;
            break;
            case 3: 
            filters.map = filter;
            break;
            case 4: 
            filters.elo = filter;
            break;
            case 5: 
            filters.solo = filter;
            break;
            case 6:
                filters.search = filter;
            default:
                break;
        }
    }

    getMode(id) {
        var mode ="";
        switch (id) {
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

    getMapName(id) {
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

    resetFilters() {
        this.filterLobby(1, all);
        this.filterLobby(2, all);
        this.filterLobby(3, all);
        this.filterLobby(4, 0);
        this.filterLobby(5, all);
        notifService3.updateNotif(NOTIF_FILTER_RESET, filteredLobbyList);
    }

    async getAllLobby() {
        let ll = await this.fetchLobby();
        filteredLobbyList = [];

        await ll.forEach(l => this.applyFilter(l));
        return await filteredLobbyList;
    }

    async fetchLobby() {
        var proxy = "https://crossorigin.me/";
        var proxy2 = "https://cors-anywhere.herokuapp.com/";
        let API = "http://localhost:3000/lobbylist";
        // return await fetch(proxy + "https://aoe2.net/api/lobbies?game=aoe2de")
        //                 .then(async response => {
        //                     return await response.json();
        //                 });
        // return await fetch(proxy2 + "https://aoe2.net/api/lobbies?game=aoe2de")
        //                 .then(async response => {
        //                     return await response.json();
        //                 });

        return await fetch("https://aoe2.net/api/lobbies?game=aoe2de")
            .then(async response => {
                return await response.json();
            });
    }

    async getLobbyId(steamid) {
        let API = "http://localhost:3000/getProfile";
        return await fetch("http://localhost:3000/getProfile")
                        .then(async resp => {
                            let x = await resp.json();
                            console.log(x);
                            return x;
                        });
    }


    filterLobbyBySearch(id, filter) {
        filteredLobbyList = [];
        //case id represents each filter, top to bottom
        this.setFilter(filter, id);
        (async () => {
            allLobby = await this.getAllLobby();
        })();
        allLobby.forEach(l => this.applySearchFilter(l));
        notifService.updateNotif(NOTIF_LOBBY_UPDATED, filteredLobbyList);

    }
}

export default LobbyService;
