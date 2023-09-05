import CarFactory from "./carFactory.js";
import dataLoad from "./dataLoader.js";

window.onload = function () {
  (async () => {
    const allDataArray = await dataLoad("./src/cars.json");
    const data = allDataArray[0];
    let itemsToLoad = 16;

    const carFactory = new CarFactory(data, itemsToLoad, ".container");

    carFactory.createCards();
    carFactory.loadCards(24, 1);
  })();
};
