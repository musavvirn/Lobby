import 'whatwg-fetch';
import NotificationService, { NOTIF_PLAYERLIST_REQUEST } from '../services/notificationService';
import NotificationService2, { NOTIF_PLAYER_INFO_REQUEST } from '../services/notificationService';

var instance = null;
var currentPlayers = [];
var notifService = new NotificationService();
var notifService2 = new NotificationService2();

class PlayerService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    //obtains list of players from selected lobby and sends data to playerList for display
    getPlayerInfo(players, num) {
        currentPlayers = [];
        players.forEach(p => {
            if (p.name !== null) {
                if (!(p.name.includes("Open") || p.name.includes("Closed"))) {
                    currentPlayers.push(p);      
                } 
            }
                     
        });
        notifService.updateNotif(NOTIF_PLAYERLIST_REQUEST, currentPlayers);
    }

    //obtains specific player from hovering and sends player data to playerInfo for display
    updateInfo(player) {
        notifService2.updateNotif(NOTIF_PLAYER_INFO_REQUEST, player);
    }

    removePlayer() {
        currentPlayers = [];
        notifService.updateNotif(NOTIF_PLAYERLIST_REQUEST, currentPlayers);
    }
}

export default PlayerService;
