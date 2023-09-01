import CarSlide from "./carSlides.js";
import carousel from "./carousel.js";
import CarSearch from "./carSearch.js";
import * as utilities from "./utilities.js";
import dataLoad from "./dataLoader.js";
window.onload = function () {
  /*   const firstSlide = new CarSlide(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "./img/ExampleCards/ImageOne.png"
  );
  const secondSlide = new CarSlide(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "./img/ExampleCards/ImageTwo.png"
  );
  const thirdSlide = new CarSlide(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "./img/ExampleCards/ImageThree.png"
  );
  firstSlide.createListItem("data-active");
  secondSlide.createListItem();
  thirdSlide.createListItem();
 */
  (async () => {
    const allDataArray = await dataLoad("./src/cars.json");
    const recommended = allDataArray[1];
    const firstObject = true;
    recommended.forEach((object) => {
      const newSlide = new CarSlide(
        object.data.make,
        object.data.price,
        ".carousel",
        `./car.html?id=${object.keyID}`,
        `./img/ExampleCards/ImageTwo.png`
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
        "./src/extendedCarSearchOptions.json"
      );
      const optionsArray = await utilities.fetchJSON(
        "./src/carSearchOption.json"
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
