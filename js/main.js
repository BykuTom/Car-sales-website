import NavigationButton from "./navBar.js";
import { headerTemplate, footerTemplate } from "./templates.js";
import * as utilities from "./utilities.js";
import dataLoad from "./dataLoader.js";

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  document.body.innerHTML += headerTemplate;
  document.body.innerHTML += footerTemplate;
  const template = document.querySelector(`#template`);
  const footertemplate = document.querySelector(`#footerTemplate`);
  const clonedHeader = template.content.cloneNode(true);
  const clonedFooter = footertemplate.content.cloneNode(true);
  body.insertBefore(clonedHeader, document.querySelector("main"));
  body.appendChild(clonedFooter);
  const blurMask = utilities.createElement("div", "mainBlurMask");
  document
    .querySelector("main")
    .insertBefore(blurMask, document.querySelector("main").firstChild);
  const elementArray = utilities.queryElements(
    false,
    false,
    "body",
    "header",
    "footer",
    "main"
  );
  template.remove();
  footertemplate.remove();
  console.log(elementArray);
  const navigation = new NavigationButton(
    ".navLinks",
    ".navBarExpandButton",
    "main",
    ".mainBlurMask"
  );

  /*   const allDataArray = async function () {
    return await dataLoad("./src/cars.json");
  }; */

  (async () => {
    const allDataArray = await dataLoad("./src/cars.json");
    console.log(allDataArray);
  })();
});
// TODO:create an universal intersection observer class which will take in arguments such as element
// or elements and give them an animation that is determinded on treshold of visibility. This is going
// to be its own file
