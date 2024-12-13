require('dotenv').config();

const express = require('express');
const LocationInformation = require('./modules/LocationInformation');
const StopEvent = require('./modules/StopEvent');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

LocationInformation.getNearStops(6.155931562557049, 46.20005937061525).then(console.log).catch(console.error);
StopEvent.getNextDepartures(8592910).then(console.log).catch(console.error);