export default function carousel(buttonsDataAttribute) {
  //"[data-carousel-button]"
  const buttons = document.querySelectorAll(buttonsDataAttribute);
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
