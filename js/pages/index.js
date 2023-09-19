import CarSlide from "../components/carSlides.js";
import carousel from "../components/carousel.js";
import CarSearch from "../components/carSearch.js";
import * as utilities from "../utilities.js";
import dataLoad from "../components/dataLoader.js";

window.onload = function () {
  (async () => {
    const allDataArray = await dataLoad("./assets/json/cars.json");
    const recommended = allDataArray[1];
    let firstObject = true;

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
        `${object.data.mainImageURL}`
      );
      if (!firstObject) {
        newSlide.createListItem();
      } else {
        newSlide.createListItem("data-active");
        firstObject = false;
      }
    });
    carousel("[data-carousel-button]");
  })();

  (() => {
    const buttons = document
      .querySelector(".featured-vehicles-categories")
      .querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((butt) => {
          butt.classList.remove("selected");
        });
        button.classList.add("selected");
      });
    });
  })();

  async function initialiseForm(optionsArray) {
    try {
      const additionalOptionsObject = await utilities.fetchJSON(
        "./assets/json/extendedCarSearchOptions.json"
      );

      const carSearchForm = new CarSearch(
        ".search-form",
        optionsArray,
        ".search-button-more",
        additionalOptionsObject
      );
      carSearchForm.createCarSearchForm();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};
