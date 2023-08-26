import CarCard from "./carCards.js";
import CarSearch from "./carSearch.js";
import carousel from "./carousel.js";
import NavigationButton from "./navBar.js";

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
    "./img/ExampleCards/ImageOne.png"
  );
  const secondCard = new CarCard(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "./img/ExampleCards/ImageTwo.png"
  );
  const thirdCard = new CarCard(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "./img/ExampleCards/ImageThree.png"
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
