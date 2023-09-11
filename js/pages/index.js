import CarSlide from "../components/carSlides.js";
import carousel from "../components/carousel.js";
import CarSearch from "../components/carSearch.js";
import * as utilities from "../utilities.js";
import dataLoad from "../components/dataLoader.js";
window.onload = function () {
  (async () => {
    const allDataArray = await dataLoad("./assets/json/cars.json");
    const recommended = allDataArray[1];
    const firstObject = true;

    let basicOptionsArray = [];

    await allDataArray[0].forEach((object) => {
      const make = object.data.make;
      const model = object.data.model;

      if (!basicOptionsArray.find((item) => item.make === make)) {
        basicOptionsArray.push({ make: make, models: [model] });
      } else {
        const foundItem = basicOptionsArray.find((item) => item.make === make);
        foundItem.models.push(model);
      }
    });

    initialiseForm(basicOptionsArray);

    recommended.forEach((object) => {
      const newSlide = new CarSlide(
        object.data.make,
        object.data.price,
        ".carousel",
        `./car.html?id=${object.keyID}`,
        `./assets/images/ExampleCards/ImageTwo.png`
      );
      if (!firstObject) {
        newSlide.createListItem();
      } else {
        newSlide.createListItem("data-active");
      }
    });
    carousel("[data-carousel-button]");
  })();

  async function initialiseForm(optionsArray) {
    try {
      console.log(optionsArray);
      const additionalOptionsObject = await utilities.fetchJSON(
        "./assets/json/extendedCarSearchOptions.json"
      );

      const carSearchForm = new CarSearch(
        ".carSearchForm",
        optionsArray,
        ".carSearchMoreOptionsButton",
        additionalOptionsObject
      );
      carSearchForm.createCarSearchForm();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};
