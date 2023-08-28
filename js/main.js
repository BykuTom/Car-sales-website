import CarSlide from "./carSlides.js";
import CarSearch from "./carSearch.js";
import carousel from "./carousel.js";
import NavigationButton from "./navBar.js";
import fetchJSON from "./utilities.js";

const navigation = new NavigationButton(
  ".navLinks",
  ".navBarExpandButton",
  "main",
  ".mainBlurMask"
);

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
      const additionalOptionsObject = await fetchJSON(
        "./src/extendedCarSearchOptions.json"
      );
      const optionsArray = await fetchJSON("./src/carSearchOption.json");
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

// TODO:create an universal intersection observer class which will take in arguments such as element
// or elements and give them an animation that is determinded on treshold of visibility. This is going
// to be its own file
