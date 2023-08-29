import * as utilities from "./utilities.js";

export default class CarFactory {
  constructor(JSONData, itemsToBeLoaded, cardContainer) {
    this.JSONData = JSONData;
    this.itemsToBeLoaded = itemsToBeLoaded;
    this.cardContainer = document.querySelector(cardContainer);
  }
  cards = [];

  createCards() {
    this.JSONData.array.forEach((carData) => {
      const card = utilities.createElement("div", card);

      const cardLink = utilities.createElement("a");
      cardLink.setAttribute("href", carData.link);
      card.appendChild(cardLink);

      const cardTop = utilities.createElement("div", "card-top");

      const cardTopCarNames = utilities.createElement(
        "div",
        "card-top-car-names"
      );
      cardTopCarNames.appendChild(
        utilities.createTextElement("h1", carData.make)
      );
      cardTopCarNames.appendChild(
        utilities.createTextElement("h2", carData.model)
      );
      cardTop.appendChild(cardTopCarNames);

      const cardTopPrice = utilities.createElement("div", "card-top-price");
      cardTopPrice.appendChild(
        utilities.createTextElement("h2", carData.price)
      );
      cardTopPrice.appendChild(
        utilities.createTextElement("h3", carData.financePrice)
      );

      cardTop.appendChild(cardTopPrice);
      card.appendChild(cardTop);

      const cardContent = utilities.createTextElement("div", "card-content");
      cardContent.appendChild(
        utilities.createImageElement(carData.imageURL, `${carData.make} image`)
      );
      card.appendChild(cardContent);

      const cardBottom = utilities.createElement("div", "card-bottom");
      cardBottom.appendChild(utilities.createImageElement(/* gear icon */));
      cardBottom.appendChild(utilities.createImageElement(/* body icon */));
      cardBottom.appendChild(utilities.createImageElement(/* fuel icon */));
      cardBottom.appendChild(utilities.createImageElement(/* engine icon */));

      cardBottom.appendChild(utilities.createTextElement("h4", carData.gear));
      cardBottom.appendChild(utilities.createTextElement("h4", carData.body));
      cardBottom.appendChild(utilities.createTextElement("h4", carData.fuel));
      cardBottom.appendChild(utilities.createTextElement("h4", carData.engine));

      card.appendChild(cardBottom);
      this.cards.push(card);
    });
  }

  loadCards(pageSize, pageNumber) {
    const data = utilities.divideArray(cards, pageSize);

    data[pageNumber - 1].forEach((card) => {
      this.cardContainer.appendChild(card);
    });
  }
}

/* const card = document.createElement("div");
const cardLink = document.createElement("a");
cardLink.setAttribute("href", carData.link);
card.appendChild(cardLink);
const cardTop = document.createElement("div");
const cardTopCarNames = document.createElement("div");
const cardTitle = document.createElement("h1");
cardTitle.innerText = carData.make;
cardTopCarNames.appendChild(cardTitle);
const cardSubtitle = document.createElement("h2");
cardSubtitle.innerText = carData.model;
cardTopCarNames.appendChild(cardSubtitle);
cardTop.appendChild(cardTopCarNames);
const cardTopPrice = document.createElement("div");
const cardPrice = document.createElement("h2");
cardPrice.innerText = carData.price;
cardTopPrice.appendChild(cardPrice);
const cardFinancePrice = document.createElement("h3");
cardFinancePrice.innerText = carData.financePrice;
cardTopPrice.appendChild(cardFinancePrice);
cardTop.appendChild(cardTopPrice);
card.appendChild(cardTop);
const cardContent = document.createElement("div");
const cardImage = document.createElement("img");
cardImage.setAttribute("src", carData.imageURL);
cardImage.setAttribute("alt", `${carData.make} image`);
cardContent.appendChild(cardImage);
card.appendChild(cardContent);
const cardBottom = document.createElement("div");
const cardBottomGearIcon = document.createElement("img");
cardBottom.appendChild(cardBottomGearIcon);
const cardBottomBodyIcon = document.createElement("img");
cardBottom.appendChild(cardBottomBodyIcon);
const cardBottomFuelIcon = document.createElement("img");
cardBottom.appendChild(cardBottomFuelIcon);
const cardBottomEngineIcon = document.createElement("img");
cardBottom.appendChild(cardBottomEngineIcon);
const cardBottomGearInfo = document.createElement("h4");
cardBottomGearInfo.innerText = carData.gear;
cardBottom.appendChild(cardBottomGearInfo);
const cardBottomBodyInfo = document.createElement("h4");
cardBottomBodyInfo.innerText = carData.body;
cardBottom.appendChild(cardBottomBodyInfo);
const cardBottomFuelInfo = document.createElement("h4");
cardBottomFuelInfo.innerText = carData.fuel;
cardBottom.appendChild(cardBottomFuelInfo);
const cardBottomEngineInfo = document.createElement("h4");
cardBottomEngineInfo.innerText = carData.engine;
cardBottom.appendChild(cardBottomEngineInfo);
card.appendChild(cardBottom);
this.cards.push(card); */
