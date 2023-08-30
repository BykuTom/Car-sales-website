import CarSlide from "./carSlides.js";
import carousel from "./carousel.js";
import CarSearch from "./carSearch.js";
import * as utilities from "./utilities.js";

window.onload = function () {
  const firstSlide = new CarSlide(
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
  carousel("[data-carousel-button]");

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
