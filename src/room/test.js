const newDate = new Date();

class Test {
    constructor(name, host) {
        this.id = newDate.getDate().toString() + newDate.getHours().toString() + newDate.getMinutes().toString() + newDate.getSeconds().toString();    
        this.name = name; 
        this.host = host;
        this.timeHosted = Date.now();
    }


    getAge() {
        let x = Date.now();
        let diff = ((x - this.timeHosted) / (60*1000)).toFixed(0);
        let result = 0;
        if (diff > 60) {
            result = (diff / 60).toFixed(2) + " hr " + (diff % 60) + " min";
        } else {
            result = diff + " min";
        }
        return result;
    }
}

export default Test;