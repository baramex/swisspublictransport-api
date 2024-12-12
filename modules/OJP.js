const { DOMParser } = require('xmldom');
const { default: axios } = require("axios");

class OJP {
    static apiKey = process.env.OJP_API_KEY;

    static request(data) {
        return axios.post(`https://api.opentransportdata.swiss/ojp20`, `<?xml version="1.0" encoding="UTF-8"?>
        <OJP xmlns="http://www.vdv.de/ojp" xmlns:siri="http://www.siri.org.uk/siri" version="2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.vdv.de/ojp ../../../../Downloads/OJP-changes_for_v1.1%20(1)/OJP-changes_for_v1.1/OJP.xsd">
            <OJPRequest>
                <siri:ServiceRequest>
                    ${data}
                </siri:ServiceRequest>
            </OJPRequest>
        </OJP>`, { headers: { 'Authorization': `Bearer ${this.apiKey}`, "Content-Type": "application/xml" } });
    }

    static domXML(data) {
        return new DOMParser().parseFromString(data, "application/xml");
    }
}

module.exports = OJP;