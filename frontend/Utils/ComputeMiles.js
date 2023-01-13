export function computeMiles(travalModes) {
  let miles = 0;
  travalModes.forEach((travalMode) => {
    if (travalMode.travalMode === "WALKING") {
      miles += 6 * travalMode.distance * 1000 * 0.62;
    } else if (travalMode.travalMode === "DRIVING") {
      miles += 0;
    } else if (travalMode.travalMode === "BICYCLING") {
      miles += 1.2 * travalMode.distance * 1000 * 0.62;
    } else {
      miles += travalMode.distance * 1000 * 0.62;
    }
  });

  // console.log("COMPUTE MILES: ", miles);

  return miles;
}
