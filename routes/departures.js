const StopEvent = require("../modules/StopEvent");

async function getNextDepartures(req, res) {
    try {
        const stopId = req.params.stopId;
        if (!stopId) return res.status(400).json({ error: "Missing required parameter stopId" });
        const departures = await StopEvent.getNextDepartures(stopId);
        res.json(departures);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getNextDepartures };