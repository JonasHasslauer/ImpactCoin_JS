//const fetch = require('node-fetch'); // In Node.js-Umgebung benötigt

class Climatiq {

    static MY_API_KEY = "ZDDQA9ZW80M9FVN83NYE3QF9CEW5";
    static url = "https://beta4.api.climatiq.io/estimate";

    constructor(passengers, distance, customId, dataVersion, sourceLcaActivity) {
        this.authorizationHeaders = { "Authorization": `Bearer: ${Climatiq.MY_API_KEY}` };
        this.sourceLcaActivity = sourceLcaActivity;
        this.dataVersion = dataVersion;
        this.activityId = customId;
        this.passengers = passengers;
        this.distance = distance;
    }

    calculateCo2e() {
        const parameters = {
            passengers: this.passengers,
            distance: this.distance,
            distance_unit: "km"
        };

        return {
            emission_factor: {
                activity_id: this.activityId,
                source: "UBA",
                region: "DE",
                year: 2020,
                source_lca_activity: this.sourceLcaActivity,
                data_version: this.dataVersion
            },
            parameters: parameters
        };
    }
}

async function fetchData(url, data, headers) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    return response.json();
}

const carOnePerson = new Climatiq(passenger = 1,
    1,
    "passenger_vehicle-vehicle_type_car-fuel_source_bio_petrol-distance_na-engine_size_medium",
    "^0",
    "fuel_combustion");

const carOne = fetchData(Climatiq.url, carOnePerson.calculateCo2e(), carOnePerson.authorizationHeaders);

