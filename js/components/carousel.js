export default function carousel(buttonsDataAttribute) {
  //"[data-carousel-button]"
  const buttons = document.querySelectorAll(buttonsDataAttribute);
  const slidesContainer = buttons[0].closest("[data-carousel]");
  let isAnimating = false; // Flag to track animation status
  let lastPressed = new Date();

  function changeSlide(offset) {
    if (isAnimating) {
      return;
    }

    isAnimating = true;

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
  }

  setInterval(() => {
    const currentTime = new Date();
    const timeElapsed = currentTime - lastPressed;

    if (timeElapsed > 10000) {
      changeSlide(1);
      lastPressed = new Date();
    }
  }, 2000);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      changeSlide(offset);
      lastPressed = new Date();
    });
  });
}
