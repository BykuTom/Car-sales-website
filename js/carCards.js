export default class CarCards {
  constructor(carName, carPrice, parentElementClass, link, imageLink) {
    this.carName = carName;
    this.carPrice = carPrice;
    this.parentElement = document.querySelector(parentElementClass);
    this.link = link;
    this.imageLink = imageLink;

    const randomValues = new Uint8Array(20);
    crypto.getRandomValues(randomValues);
    this.carID = Array.from(randomValues, (byte) => byte.toString(16)).join("");
  }

  createListItem(optionalData = null) {
    const listItem = document.createElement("li");
    const linkElement = document.createElement("a");
    const imageElement = document.createElement("img");

    linkElement.setAttribute("href", this.link);
    imageElement.setAttribute("src", this.imageLink);
    imageElement.setAttribute("alt", `${this.carName} image`);

    listItem.setAttribute("key", this.carID);
    listItem.setAttribute("carTitle", this.carName);
    listItem.setAttribute("carPrice", this.carPrice);
    listItem.classList.add("carCard");

    listItem.appendChild(linkElement);
    listItem.appendChild(imageElement);

    if (optionalData !== null) {
      listItem.dataset.active = true;
    }
    this.parentElement.appendChild(listItem);
  }
}
