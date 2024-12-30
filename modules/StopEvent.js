const Departure = require("./Departure");
const OJP = require("./OJP");

class StopEvent extends OJP {
    static async getNextDepartures(stopRef, count = 10) {
        const res = await this.request(`
            <OJPStopEventRequest>
                <Location>
                  <PlaceRef>
                      <StopPlaceRef>${stopRef}</StopPlaceRef>
                  </PlaceRef>
              </Location>
              <Params>
                  <NumberOfResults>${count}</NumberOfResults>
                  <StopEventType>departure</StopEventType>
                  <IncludeRealtimeData>true</IncludeRealtimeData>
                  <IncludeOperatingDays>false</IncludeOperatingDays>
              </Params>
          </OJPStopEventRequest>
        `);

        return this.parseXML(res.data, stopRef);
    }

    static parseXML(data, stopRef) {
        const dom = this.domXML(data);
        const departures = dom.getElementsByTagName("StopEvent");
        const result = [];
        for (let i = 0; i < departures.length; i++) {
            const departure = departures.item(i);
            const thisCall = departure.getElementsByTagName("ThisCall").item(0);
            const service = departure.getElementsByTagName("Service").item(0);
            result.push(new Departure(
                service.getElementsByTagName("TripRef").item(0)?.textContent, // TO CHECK
                stopRef,
                service.getElementsByTagName("siri:LineRef").item(0)?.textContent,
                service.getElementsByTagName("siri:DirectionRef").item(0)?.textContent,
                thisCall.getElementsByTagName("ServiceDeparture").item(0).getElementsByTagName("TimetabledTime").item(0)?.textContent,
                thisCall.getElementsByTagName("ServiceDeparture").item(0).getElementsByTagName("EstimatedTime").item(0)?.textContent,
                thisCall.getElementsByTagName("PlannedQuay").item(0)?.textContent,
                service.getElementsByTagName("PublishedServiceName").item(0).getElementsByTagName("Text").item(0)?.textContent,
                service.getElementsByTagName("DestinationText").item(0).getElementsByTagName("Text").item(0)?.textContent,
                service.getElementsByTagName("Cancelled").item(0)?.textContent,
                service.getElementsByTagName("Unplanned").item(0)?.textContent,
                service.getElementsByTagName("Deviation").item(0)?.textContent
            ));
        }
        return result.sort((a, b) => (a.realtimeDepartureTime || a.scheduledDepartureTime) - (b.realtimeDepartureTime || b.scheduledDepartureTime));
    }
}

module.exports = StopEvent;