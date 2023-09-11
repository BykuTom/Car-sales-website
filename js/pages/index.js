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
  async function initialiseForm() {
    try {
      const additionalOptionsObject = await utilities.fetchJSON(
        "./assets/json/extendedCarSearchOptions.json"
      );
      const optionsArray = await utilities.fetchJSON(
        "./assets/json/carSearchOption.json"
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
  initialiseForm();
};
