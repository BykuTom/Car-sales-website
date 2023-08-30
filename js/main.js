import NavigationButton from "./navBar.js";
import { headerTemplate } from "./templates.js";
import * as utilities from "./utilities.js";

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  document.body.innerHTML += headerTemplate;
  const template = document.querySelector(`#template`);
  const clonedContent = template.content.cloneNode(true);
  body.insertBefore(clonedContent, document.querySelector("main"));
  const blurMask = utilities.createElement("div", "mainBlurMask");
  document
    .querySelector("main")
    .insertBefore(blurMask, document.querySelector("main").firstChild);
  const navigation = new NavigationButton(
    ".navLinks",
    ".navBarExpandButton",
    "main",
    ".mainBlurMask"
  );
});
// TODO:create an universal intersection observer class which will take in arguments such as element
// or elements and give them an animation that is determinded on treshold of visibility. This is going
// to be its own file
