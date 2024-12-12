require('dotenv').config();

const express = require('express');
const LocationInformation = require('./modules/LocationInformation');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

LocationInformation.getNearStops(8.541694, 47.376888).then(console.log).catch(console.error);