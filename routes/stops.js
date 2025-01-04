const Location = require("../modules/Location");
const LocationInformation = require("../modules/LocationInformation");

async function getNearStops(req, res) {
    try {
        const lon = req.query.lon;
        const lat = req.query.lat;
        if (!lon || !lat) return res.status(400).json({ error: "Missing required parameters lon and lat" });
        const stops = await LocationInformation.getNearStops(lon, lat);
        res.json(stops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getNearStops };