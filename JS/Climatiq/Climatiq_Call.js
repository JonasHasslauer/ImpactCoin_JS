const fetch = require('node-fetch'); // In Node.js-Umgebung benötigt

class Climatiq {

    static MY_API_KEY = "ZDDQA9ZW80M9FVN83NYE3QF9CEW5";
    static url = "https://beta4.api.climatiq.io/estimate";

    constructor(customId, dataVersion, sourceLcaActivity) {
        this.authorizationHeaders = { "Authorization": `Bearer ${Climatiq.MY_API_KEY}` };
        this.sourceLcaActivity = sourceLcaActivity;
        this.dataVersion = dataVersion;
        this.activityId = customId;
        this.passengers = 1;
        this.distance = 1;
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

const carOnePerson = new Climatiq("passenger_vehicle-vehicle_type_car-fuel_source_bio_petrol-distance_na-engine_size_medium", "^0", "fuel_combustion");
const trainOnePerson = new Climatiq("passenger_train-route_type_local-fuel_source_diesel", "^0", "upstream-fuel_combustion");

async function fetchData(url, data, headers) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    return response.json();
}

(async () => {
    const responseCarOnePerson = await fetchData(Climatiq.url, carOnePerson.calculateCo2e(), carOnePerson.authorizationHeaders);
    const responseTrainOnePerson = await fetchData(Climatiq.url, trainOnePerson.calculateCo2e(), trainOnePerson.authorizationHeaders);

    const referenzwertAutoEinePerson = responseCarOnePerson.co2e;
    const referenzwertTrainEinePerson = responseTrainOnePerson.co2e;

    const auto = JSON.stringify(referenzwertAutoEinePerson, null, 2);
    const bahn = JSON.stringify(referenzwertTrainEinePerson, null, 2);

    const diff = parseFloat(auto) - parseFloat(bahn);

    console.log(`Auto: ${auto}\nBahn: ${bahn} -> Diff: ${diff}`);
})();

module.exports = Climatiq;