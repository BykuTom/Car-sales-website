import CarCards from "./carCards.js";

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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      console.log(newIndex);
      if (newIndex < 0) {
        newIndex = slides.children.length - 1;
      }
      if (newIndex >= slides.children.length) {
        newIndex = 0;
      }

      for (const child of slides.children) {
        delete child.dataset.transition;
      }

      slides.children[newIndex].dataset.active = true;
      activeSlide.dataset.transition = true;
      delete activeSlide.dataset.active;
    });
  });
}

const navigation = new NavigationButton(
  ".navLinks",
  ".navBarExpandButton",
  "main",
  ".mainBlurMask"
);

window.onload = function () {
  const firstCard = new CarCards(
    "Toyota",
    20000,
    ".carousel",
    "#",
    "/img/ExampleCards/FortTransit.jpg"
  );
  firstCard.createListItem("data-active");
  firstCard.createListItem();
  firstCard.createListItem();
  carousel();
};
