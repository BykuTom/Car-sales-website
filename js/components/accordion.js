export default function accordion(elementClass, content) {
  const accordionQuery = document.querySelector(`.${elementClass}`);
  const accordionDotQuery = document.querySelector(elementClass);
  let accordion;

  if (accordionQuery) {
    accordion = accordionQuery;
  } else if (accordionDotQuery) {
    accordion = accordionDotQuery;
  }

  accordion.querySelector(".accordion-button").addEventListener("click", () => {
    accordion.classList.toggle("active");
  });
  accordion.querySelector("p").innerText = content;
}
