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
