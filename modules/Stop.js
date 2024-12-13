class Stop {
    constructor(name, ref, lon, lat, probability) {
        this.name = name;
        this.ref = Number(ref);
        this.lon = Number(lon);
        this.lat = Number(lat);
        this.probability = probability;
    }
}

module.exports = Stop;