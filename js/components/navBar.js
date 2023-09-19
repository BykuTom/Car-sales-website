export default class Navigation {
  constructor(ulElementClass, buttonClass, mainElement, blurMask) {
    this.ulElement = document.querySelector(ulElementClass);
    this.expandButton = document.querySelector(buttonClass);
    this.mainElement = document.querySelector(mainElement);
    this.mainBlurMask = document.querySelector(blurMask);
    this.expandButton.addEventListener("click", this.handleClick.bind(this));

    const ulChildElements = this.ulElement.querySelectorAll("li");
    const filteredElements = ulChildElements.forEach((element) => {
      element.addEventListener("click", this.handleClick.bind(this));
    });
  }

  body = document.querySelector("body");

  handleClick() {
    if (this.body.offsetWidth < 1024) {
      const expandButtonBar = this.expandButton.querySelector(".bar");
      this.ulElement.classList.toggle("open");
      this.mainElement.classList.toggle("nav-open");
      this.mainBlurMask.classList.toggle("on");
      expandButtonBar.classList.toggle("active");
      this.expandButton.classList.toggle("active");
      const expandedState = this.ulElement.getAttribute("aria-expanded");
      this.ulElement.setAttribute("aria-expanded", !eval(expandedState));
    }
  }
}
