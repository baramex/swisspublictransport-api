class Departure {
    constructor(tripRef, stopRef, lineRef, direction, scheduledDepartureTime, realtimeDepartureTime, platformName, lineName, destinationName, cancelled, unplanned, deviation) {
        this.tripRef = tripRef;
        this.stopRef = stopRef;
        this.lineRef = lineRef;
        this.direction = direction;
        this.scheduledDepartureTime = Math.round(new Date(scheduledDepartureTime).getTime() / 1000);
        this.realtimeDepartureTime = Math.round(new Date(realtimeDepartureTime).getTime() / 1000);
        this.platformName = platformName;
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.cancelled = cancelled === "true" ? true : false;
        this.unplanned = unplanned === "true" ? true : false;
        this.deviation = deviation === "true" ? true : false;
    }
}

module.exports = Departure;