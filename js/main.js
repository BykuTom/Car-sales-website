import CarCard from "./carCards.js";
import CarSearch from "./carSearch.js";
import carousel from "./carousel.js";
import NavigationButton from "./navBar.js";

/* function carousel() {
  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      let direction;

      const slidesContainer = button.closest("[data-carousel]");
      const slides = slidesContainer.querySelector("[data-slides]");

      const activeSlide = slides.querySelector("[data-active]");

      let newIndex = [...slides.children].indexOf(activeSlide) + offset;

      if (newIndex < 0) {
        newIndex = slides.children.length - 1;
      }
      if (newIndex >= slides.children.length) {
        newIndex = 0;
      }

      let leftIndex = newIndex - 1;
      let rightInex = newIndex + 1;
      for (const child of slides.children) {
        delete child.dataset.direction; // Clear any previous transition direction
      }

      if (leftIndex < 0) {
        leftIndex = slides.children.length - 1;
      }
      if (leftIndex >= slides.children.length) {
        leftIndex = 0;
      }
      if (rightInex < 0) {
        rightInex = slides.children.length - 1;
      }
      if (rightInex >= slides.children.length) {
        rightInex = 0;
      }

      slides.children[rightInex].dataset.direction = "right";

      slides.children[leftIndex].dataset.direction = "left";

      for (const child of slides.children) {
        delete child.dataset.transition; // Clear any previous transition direction
      }
      if (offset === 1) {
        slides.children[leftIndex].dataset.transition = true;
      } else {
        slides.children[rightInex].dataset.transition = true;
      }
      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });
} */

const navigation = new NavigationButton(
  ".navLinks",
  ".navBarExpandButton",
  "main",
  ".mainBlurMask"
);

window.onload = function () {
  const firstCard = new CarCard(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "/img/ExampleCards/ImageOne.png"
  );
  const secondCard = new CarCard(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "/img/ExampleCards/ImageTwo.png"
  );
  const thirdCard = new CarCard(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "/img/ExampleCards/ImageThree.png"
  );
  firstCard.createListItem("data-active");
  secondCard.createListItem();
  thirdCard.createListItem();
  carousel("[data-carousel-button]");
  let makemodelobjectarray = [
    {
      make: "Toyota",
      models: ["Corolla", "Camry", "RAV4"],
    },
    {
      make: "Ford",
      models: ["Fiesta", "Focus", "Mustang"],
    },
  ];
  let additionalOptionsObject = {
    bodyStyle: [
      "Convertible",
      "Coupe",
      "Crossover",
      "Estate",
      "Four Wheel Drive",
      "Hatchback",
      "MPV",
      "Pick up",
      "Saloon",
      "Van",
    ],
    fuelType: ["Hybrid", "Diesel", "Petrol", "Electric", "Other"],
    transmissionTypes: ["Manual", "Automatic", "Semi Automatic", "DSG", "CVT"],
    doorNumber: ["3", "5"],
    colours: [
      "Red",
      "Orange",
      "Yellow",
      "Green",
      "Blue",
      "Purple",
      "Pink",
      "White",
      "Silver",
      "Grey",
      "Black",
    ],
    engineSizes: [
      "up to 1 litre",
      "1 litre to 1.3 litre",
      "1.3 litre to 1.6 litre",
      "1.6 litre to 1.9 litre",
      "2 litre +",
    ],
    taxBands: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
  };
  const carSearchForm = new CarSearch(
    ".carSearchForm",
    makemodelobjectarray,
    ".carSearchMoreOptionsButton",
    additionalOptionsObject
  );
  carSearchForm.createCarSearchForm();
};

// TODO:create an universal intersection observer class which will take in arguments such as element
// or elements and give them an animation that is determinded on treshold of visibility. This is going
// to be its own file
