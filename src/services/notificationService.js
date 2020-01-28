
//observers is an object of arrays of notification types;
//each type is an object containing keys: an observer component and a callback()
export const NOTIF_LOBBY_UPDATED = "lobby_updated";
export const NOTIF_PLAYERLIST_REQUEST = "new_player_list_requested";
export const NOTIF_PLAYER_INFO_REQUEST = "new_player_info_req";
export const NOTIF_FILTER_RESET = "filters_reset";


var observers = {};
var instance = null;

class NotificationService {
    
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    updateNotif(notifName, data) {
        var obs = observers[notifName];
        var obj;
        for (var i=0; i<obs.length; i++) {
            obj = obs[i];
            obj.callBack(data);
        }
    }

    addObserver(notifName, observer, callBack) {
        var obs = observers[notifName];

        if(!obs) {
            observers[notifName] = [];
        }
        var obj = {observer: observer, callBack: callBack};
        observers[notifName].push(obj);
    }

    removeObserver(observer, notifName) {
        var obs = observers[notifName];

        if(obs) {
            for (var i=0; i<obs.length; i++) {
                if (observer === obs[i].observer) {
                    obs.splice(i, 1);
                    observers[notifName] = obs;
                    break;
                }
            }  
        }
    }
}

export default NotificationService;