import 'whatwg-fetch';

class ProfileService {
    getPlayer () {
        // var promise = new Promise((resolve, reject) => {
        //     fetch("http://localhost:3000/p")
        //     .then(response => {
        //         resolve(response.json());
        //         reject("Failed!");
        //     })
        // });
        // console.log(promise);
        // return promise;

        var placeholder = {
                name: "Ghazna",
                id: "76561198125211835",
                elo: 1850,
                games: 100,
                winRate: "45%",
                todayGames: 5,
                dateRegistered: "02-02-2016",
                onlineStatus: "IN-GAME"
        }

        return placeholder;
        
    }
}

export default ProfileService;
