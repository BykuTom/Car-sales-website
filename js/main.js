import CarCard from "./carCards.js";
import CarSearch from "./carSearch.js";

class NavigationButton {
  constructor(ulElementClass, buttonClass, mainElement, blurMask) {
    this.ulElement = document.querySelector(ulElementClass);
    this.ExpandButton = document.querySelector(buttonClass);
    this.mainElement = document.querySelector(mainElement);
    this.mainBlurMask = document.querySelector(blurMask);
    this.ExpandButton.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    this.ulElement.classList.toggle("open");
    this.mainElement.classList.toggle("navLinksisOpen");
    this.mainBlurMask.classList.toggle("on");
    const expandedState = this.ulElement.getAttribute("aria-expanded");
    this.ulElement.setAttribute("aria-expanded", !eval(expandedState));
  }
}
function carousel() {
  const buttons = document.querySelectorAll("[data-carousel-button]");
  let isAnimating = false; // Flag to track animation status

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      const offset = button.dataset.carouselButton === "next" ? 1 : -1;

      const slidesContainer = button.closest("[data-carousel]");
      const slides = slidesContainer.querySelector("[data-slides]");
      const activeSlide = slides.querySelector("[data-active]");
      const slideCount = slides.children.length;

      const newIndex =
        (offset + slideCount + [...slides.children].indexOf(activeSlide)) %
        slideCount;
      const leftIndex = (newIndex - 1 + slideCount) % slideCount;
      const rightIndex = (newIndex + 1) % slideCount;

      for (const child of slides.children) {
        delete child.dataset.direction;
        delete child.dataset.transition;
      }

      slides.children[leftIndex].dataset.direction = "left";
      slides.children[rightIndex].dataset.direction = "right";
      slides.children[
        offset === 1 ? leftIndex : rightIndex
      ].dataset.transition = true;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;

      setTimeout(() => {
        isAnimating = false; // Reset animation flag after delay
      }, 550); // Adjust the delay duration (in milliseconds) as needed
    });
  });
}

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
  carousel();
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
  const carSearchForm = new CarSearch(
    ".carSearchForm",
    makemodelobjectarray,
    ".carSearchMoreOptionsButton"
  );
  carSearchForm.createCarSearchForm();
};

// TODO:create an universal intersection observer class which will take in arguments such as element
// or elements and give them an animation that is determinded on treshold of visibility. This is going
// to be its own file
