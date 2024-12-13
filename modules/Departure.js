class Departure {
    constructor(stopRef, lineRef, direction, scheduledDepartureTime, realtimeDepartureTime, platformName, lineName, destinationName, cancelled, unplanned, deviation) {
        this.stopRef = stopRef;
        this.lineRef = lineRef;
        this.direction = direction;
        this.scheduledDepartureTime = new Date(scheduledDepartureTime);
        this.realtimeDepartureTime = new Date(realtimeDepartureTime);
        this.platformName = platformName;
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.cancelled = cancelled === "true" ? true : false;
        this.unplanned = unplanned === "true" ? true : false;
        this.deviation = deviation === "true" ? true : false;
    }
}

module.exports = Departure;