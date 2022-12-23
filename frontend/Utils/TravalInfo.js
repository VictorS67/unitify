import { MaterialCommunityIcons } from '@expo/vector-icons';
import { normalize } from '../Tool/FontSize';

export function getEmissionTrendIcon(totalEmission, travalMode) {
    if (travalMode === null) return;

    if (totalEmission === 0) {
        return <MaterialCommunityIcons name="arrow-right" size={normalize(12)} color="black" />;
    }

    if (travalMode === "DRIVING") {
        return <MaterialCommunityIcons name="arrow-top-right" size={normalize(12)} color="red" />;
    } else if (travalMode === "WALKING") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="green" />;
    } else if (travalMode === "SUBWAY") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="green" />;
    } else if (travalMode === "BUS") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="green" />;
    } else if (travalMode === "BICYCLING") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="green" />;
    }

    return;
}

export function getCaloriesFromDuration(duration, travalMode) {
    if (duration === null) return 0;

    let cal = duration / 3600;
    if (travalMode === "DRIVING") {
        cal = 150 * duration;
    } else if (travalMode === "WALKING") {
        cal = 267 * duration;
    } else if (travalMode === "SUBWAY") {
        cal = 200 * duration;
    } else if (travalMode === "BUS") {
        cal = 200 * duration;
    } else if (travalMode === "BICYCLING") {
        cal = 245 * duration;
    }

    return cal;
}

export function getEmissionFromDistance(distance, travalMode) {
    if (distance === null) return 0;

    let km = distance / 1000;
    if (travalMode === "DRIVING") {
        km = 250.93 * km;
    } else if (travalMode === "WALKING") {
        km = -250.93 * km;
    } else if (travalMode === "SUBWAY") {
        km = -(250.93 - 41) * km;
    } else if (travalMode === "BUS") {
        km = -(250.93 - 62) * km;
    } else if (travalMode === "BICYCLING") {
        km = -250.93 * km;
    }

    return km;
}
