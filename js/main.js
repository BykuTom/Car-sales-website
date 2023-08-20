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

const navigation = new NavigationButton(
  ".navLinks",
  ".navBarExpandButton",
  "main",
  ".mainBlurMask"
);
