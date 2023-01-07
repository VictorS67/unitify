export function computeMiles(travalModes) {
  console.log("COMPUTE MILES: ", travalModes);

  let miles = 0;
  travalModes.forEach(travalMode => {
    if (travalMode.travalMode === "WALKING") {
      miles += 6 * travalMode.distance * 1000;
    } else if (travalMode.travalMode === "DRIVING") {
      miles += 0;
    } else if (travalMode.travalMode === "BICYCLING") {
      miles += 1.2 * travalMode.distance * 1000;
    } else {
      miles += travalMode.distance * 1000;
    }
  })

  return miles;
}
