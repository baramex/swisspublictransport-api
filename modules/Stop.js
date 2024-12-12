class Stop {
    constructor(name, ref, probability) {
        this.name = name;
        this.ref = Number(ref);
        this.probability = probability;
    }
}

module.exports = Stop;