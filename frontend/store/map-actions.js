import { mapActions } from "./map-slice";
import { getDirections, getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";

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
        try {
            const modes = ["DRIVING", "WALKING", "SUBWAY", "BUS", "BYCICLING"];
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
    }
}
