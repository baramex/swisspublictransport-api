const StopEvent = require("../modules/StopEvent");

async function getNextDepartures(req, res) {
    try {
        const stopRef = req.params.stopRef;
        if (!stopRef) return res.status(400).json({ error: "Missing required parameter stopRef" });
        const departures = await StopEvent.getNextDepartures(stopRef);
        res.json(departures);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getNextDepartures };