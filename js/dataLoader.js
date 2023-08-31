import * as utilities from "./utilities.js";

export default async function dataLoad(jsonURL) {
  const data = await utilities.fetchJSON(jsonURL);

  const recommended = await data.filter((item) => item.recommended === true);

  const makeModelArray = [];
  await data.forEach((item) => {
    const make = item.data.make;
    const model = item.data.model;

    const existingMake = makeModelArray.find((entry) => entry.make === make);

    if (!existingMake) {
      makeModelArray.push({ make: make, models: [model] });
    } else if (!existingMake.models.includes(model)) {
      existingMake.models.push(model);
    }
  });

  return [data, recommended, makeModelArray];
}
