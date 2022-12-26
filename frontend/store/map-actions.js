import { mapActions } from "./map-slice";
import { tripnavActions } from "./tripnav-slice";
import { getDirections, getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";

import haversine from "haversine";

export const updateDirection = (position, destination, travalMode) => {
    return async (dispatch) => {
        try {
            const direction = await getDirections(
                `${position.latitude},${position.longitude}`, 
                `${destination.latitude},${destination.longitude}`,
                travalMode
            );

            // console.log("DIRECTION");
            // console.log(direction);
            dispatch(mapActions.sOrigin(direction.origin));
            dispatch(mapActions.sDestination(direction.destination));
            dispatch(mapActions.sPolylines(direction.steps));
            dispatch(mapActions.sMarkers(direction.markers));
        } catch (error) {
            console.log("updateDirection: Something went wrong");
        }
    }
}

export const updateAllDirection = (position, destination, travalMode) => {
    return async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const modes = ["DRIVING", "WALKING", "SUBWAY", "BUS", "BICYCLING"];
                let all_mode = {}
    
                for (let index = 0; index < modes.length; index++) {
                    let direction = await getDirections(
                        `${position.latitude},${position.longitude}`, 
                        `${destination.latitude},${destination.longitude}`,
                        modes[index]
                    );
    
                    all_mode[modes[index]] = direction;
                }
    
                dispatch(mapActions.sAllDirection(all_mode));
                dispatch(mapActions.sOrigin(all_mode[travalMode].origin));
                dispatch(mapActions.sDestination(all_mode[travalMode].destination));
                dispatch(mapActions.sPolylines(all_mode[travalMode].steps));
                dispatch(mapActions.sMarkers(all_mode[travalMode].markers));
            } catch (error) {
                console.log("updateAllDirection: Something went wrong");
            }

            resolve();
        });
    }
}

export const updateNavInfo = (oldPosition, newPosition) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {

            if (oldPosition !== null && newPosition !== null) {
                const distance = haversine(
                    {
                        latitude: oldPosition.latitude,
                        longitude: oldPosition.longitude
                    }, 
                    {
                        latitude: newPosition.latitude,
                        longitude: newPosition.longitude
                    }, 
                    {
                        unit: 'meter'
                    }
                );
                const duration = Math.floor((newPosition.timestamp - oldPosition.timestamp) / 1000);
                const speed = 3.6 * newPosition.speed;

                console.log("distance: ", distance);
                console.log("duration: ", duration);
                console.log("speed: ", speed);

                // if (distance >= 30) {
                //     dispatch(tripnavActions.addDistance(distance));
                //     dispatch(tripnavActions.sSpeed(speed));
                // } else {
                //     dispatch(tripnavActions.sSpeed(0));
                // }

                dispatch(tripnavActions.addDistance(distance / 1000));
                dispatch(tripnavActions.sSpeed(speed));
                dispatch(tripnavActions.addDuration(duration));
                dispatch(tripnavActions.addTravalMode("CURRENT"));
            }

            resolve();
        });
    }
}
