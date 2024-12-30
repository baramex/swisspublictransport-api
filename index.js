require('dotenv').config();

const express = require('express');
const { getNearStops } = require('./routes/stops');
const { getNextDepartures } = require('./routes/departures');
const app = express();
const port = 6585;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
    const key = req.headers.authorization?.split(" ")[1];
    if (key !== process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});
app.get('/stops/nearby', getNearStops);
app.get("/stops/:stopRef/departures", getNextDepartures);