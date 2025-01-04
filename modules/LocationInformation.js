const OJP = require("./OJP");
const Stop = require("./Stop");

class LocationInformation extends OJP {
    static async getNearStops(lon, lat, radius = 1000, count = 5) {
        const res = await this.request(`
            <OJPLocationInformationRequest>
				<InitialInput>
					<GeoRestriction>
						<Circle>
							<Center>
								<siri:Longitude>${lon}</siri:Longitude>
								<siri:Latitude>${lat}</siri:Latitude>
							</Center>
							<Radius>${radius}</Radius>
						</Circle>
					</GeoRestriction>
				</InitialInput>
				<Restrictions>
					<Type>stop</Type>
					<NumberOfResults>${count}</NumberOfResults>
				</Restrictions>
			</OJPLocationInformationRequest>
        `);

        return this.parseXML(res.data);
    }

    static parseXML(data) {
        const dom = this.domXML(data);
        const stops = dom.getElementsByTagName("PlaceResult");
        const result = [];
        for (let i = 0; i < stops.length; i++) {
            const stop = stops.item(i);
            result.push(new Stop(
                stop.getElementsByTagName("Name").item(0).getElementsByTagName("Text").item(0).textContent,
                stop.getElementsByTagName("StopPlaceRef").item(0).textContent,
                stop.getElementsByTagName("siri:Longitude").item(0).textContent,
                stop.getElementsByTagName("siri:Latitude").item(0).textContent,
                stop.getElementsByTagName("Probability").item(0).textContent
            ));
        }
        result.sort((a, b) => Location.getDistance(lon, lat, a.lon, a.lat) - Location.getDistance(lon, lat, b.lon, b.lat));
        return result.map((a, i) => ({ ...a, order: i }));
    }
}

module.exports = LocationInformation;