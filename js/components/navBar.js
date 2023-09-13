export default class Navigation {
  constructor(ulElementClass, buttonClass, mainElement, blurMask) {
    this.ulElement = document.querySelector(ulElementClass);
    this.expandButton = document.querySelector(buttonClass);
    this.mainElement = document.querySelector(mainElement);
    this.mainBlurMask = document.querySelector(blurMask);
    this.expandButton.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    const expandButtonBar = this.expandButton.querySelector(".bar");
    this.ulElement.classList.toggle("open");
    this.mainElement.classList.toggle("navLinksisOpen");
    this.mainBlurMask.classList.toggle("on");
    expandButtonBar.classList.toggle("active");
    this.expandButton.classList.toggle("active");
    const expandedState = this.ulElement.getAttribute("aria-expanded");
    this.ulElement.setAttribute("aria-expanded", !eval(expandedState));
  }
}
