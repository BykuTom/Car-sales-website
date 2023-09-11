import { returnRandomKey } from "../utilities.js";

export default class CarSlide {
  constructor(carMake, carPrice, parentElementClass, link, imageLink) {
    this.carMake = carMake;
    this.carPrice = carPrice;
    this.parentElement = document.querySelector(parentElementClass);
    this.link = link;
    this.imageLink = imageLink;

    this.carID = returnRandomKey();
  }

  createListItem(optionalData = null) {
    const listItem = document.createElement("li");
    const linkElement = document.createElement("a");
    const imageElement = document.createElement("img");

    linkElement.setAttribute("href", this.link);
    imageElement.setAttribute("src", this.imageLink);
    imageElement.setAttribute("alt", `${this.carMake} image`);

    listItem.setAttribute("key", this.carID);
    listItem.setAttribute("carTitle", this.carMake);
    listItem.setAttribute("carPrice", this.carPrice);
    listItem.classList.add("carCard");

    listItem.appendChild(linkElement);
    listItem.appendChild(imageElement);

    if (optionalData !== null) {
      listItem.dataset.active = "";
    }
    this.parentElement.appendChild(listItem);
  }
}
