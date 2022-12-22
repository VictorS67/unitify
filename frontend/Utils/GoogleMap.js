import { decode } from "@mapbox/polyline";

export const GOOGLE_MAP_API = "AIzaSyAtc6gbQfdI-YdE7SoIeBXJMPmSV_LuOCk";

export async function getLocation(addressString) {
    try {
        const KEY = GOOGLE_MAP_API; //put your API key here.
        //otherwise, you'll have an 'unauthorized' error.

        const stringURL = addressString.replace(/\s/g, '+');

        // console.log("stringURL")
        // console.log(stringURL)

        let resp = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${stringURL}&key=${KEY}`
        );
        let respJson = await resp.json();
        let respLocation = respJson.results[0].geometry.location;
        let respAddress = respJson.results[0].formatted_address;
        // console.log(respJson.results[0])

        return {
            "latitude": respLocation.lat, 
            "longitude": respLocation.lng,
            "address": respAddress
        }

    } catch (error) {
        return error;
    }
    
}

export async function getDirections(startLoc, destinationLoc, travalModeString) {
    try {
        const KEY = GOOGLE_MAP_API; //put your API key here.
        //otherwise, you'll have an 'unauthorized' error.

        //Search for different traval mode
        let travalModeFilter = "&mode=driving";
        if (travalModeString === "SUBWAY") {
            travalModeFilter = "&mode=transit&transit_mode=subway";
        } else if (travalModeString === "BUS") {
            travalModeFilter = "&mode=transit&transit_mode=bus";
        } else if (travalModeString === "BICYCLING") {
            travalModeFilter = "&mode=bicycling";
        } else if (travalModeString === "WALKING") {
            travalModeFilter = "&mode=walking";
        }

        // console.log("DESTINATION")
        // console.log(destinationLoc)

        let resp = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}&departure_time=now${travalModeFilter}`
        );
        let respJson = await resp.json();
        // console.log("ROUTE");
        // console.log(respJson.routes);

        if ((respJson.routes.length === 0) || (respJson.routes[0].legs.length === 0)) {
            return {
                "origin": null,
                "destination": null,
                "steps": [],
                "markers": []
            }
        }

        let leg = respJson.routes[0].legs[0];
        let origin_info = {
            "latitude": leg.start_location.lat,
            "longitude": leg.start_location.lng,
            "address": leg.start_address,
            "address_simple": leg.start_address.split(",")[0]
        }
        let destination_info = {
            "latitude": leg.end_location.lat,
            "longitude": leg.end_location.lng,
            "distance": leg.distance,
            "duration": leg.duration,
            "address": leg.end_address,
            "address_simple": leg.end_address.split(",")[0]
        }
        let steps = leg.steps;
        // console.log("duration", leg.duration);
        // console.log("distance", leg.distance);

        let markers = [];
        if ((travalModeString === "SUBWAY") || (travalModeString === "BUS")) {
            markers = steps.map((step) => {
                let traval_mode = step.travel_mode;
                if (step.travel_mode === "TRANSIT") {
                    traval_mode = step.transit_details.line.vehicle.type;

                    if ((traval_mode === "BUS") || (traval_mode === "TRAM")) {
                        traval_mode = "BUS";
                    } else {
                        traval_mode = "SUBWAY";
                    }
                }

                let coords = decode(step.polyline.points);
                let mid_coord = coords[Math.floor(coords.length / 2)];

                // console.log("MID COORD");
                // console.log(mid_coord);

                return {
                    "latitude": mid_coord[0],
                    "longitude": mid_coord[1],
                    "distance": step.distance,
                    "duration": step.duration,
                    "mode": traval_mode
                };
            });
        } else {
            let points = decode(respJson.routes[0].overview_polyline.points);
            let mid_coord = points[Math.floor(points.length / 2)];

            // console.log("MID COORD");
            // console.log(mid_coord);

            markers = [{
                "latitude": mid_coord[0],
                "longitude": mid_coord[1],
                "distance": leg.distance,
                "duration": leg.duration,
                "mode": travalModeString
            }]
        }

        return {
            "origin": origin_info,
            "destination": destination_info,
            "steps": steps,
            "markers": markers
        };
    } catch (error) {
        return error;
    }
};
