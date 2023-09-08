import * as utilities from "./utilities.js";

export default class CarFactory {
  constructor(data, itemsToBeLoaded, cardContainer) {
    this.data = data;
    this.itemsToBeLoaded = itemsToBeLoaded;
    this.cardContainer = document.querySelector(cardContainer);
  }
  cards = [];
  filteredCards = [];
  sortedCards = [];
  dataCards = [];

  createCards() {
    this.data.forEach((car) => {
      const card = utilities.createElement("div", "card");
      card.setAttribute("keyID", car.keyID);
      const cardLink = utilities.createElement("a");
      cardLink.setAttribute("href", `car.html?id=${car.keyID}`);
      card.appendChild(cardLink);

      const cardTop = utilities.createElement("div", "card-top");

      const cardTopCarNames = utilities.createElement(
        "div",
        "card-top-car-names"
      );
      cardTopCarNames.appendChild(
        utilities.createTextElement("h1", car.data.make)
      );
      cardTopCarNames.appendChild(
        utilities.createTextElement("h2", car.data.model)
      );
      cardTopCarNames.appendChild(
        utilities.createTextElement("h3", car.data.year)
      );
      cardTop.appendChild(cardTopCarNames);

      const cardTopPrice = utilities.createElement("div", "card-top-price");
      cardTopPrice.appendChild(
        utilities.createTextElement("h2", `£${car.data.price}`)
      );
      cardTopPrice.appendChild(
        utilities.createTextElement(
          "h3",
          `From £${Math.ceil(car.data.price / 48)} a month!`
        )
      );

      cardTop.appendChild(cardTopPrice);
      card.appendChild(cardTop);

      const cardContent = utilities.createElement("div", "card-content");
      cardContent.appendChild(
        utilities.createImageElement(
          car.data.mainImageURL,
          `${car.data.make} image`
        )
      );
      card.appendChild(cardContent);

      const cardBottom = utilities.createElement("div", "card-bottom");
      // TODO: Causes error message of 404 not found because its empty, go fill it up!
      cardBottom.appendChild(utilities.createImageElement(/* gear icon */));
      cardBottom.appendChild(utilities.createImageElement(/* mileage icon */));
      cardBottom.appendChild(utilities.createImageElement(/* body icon */));
      cardBottom.appendChild(utilities.createImageElement(/* fuel icon */));
      cardBottom.appendChild(utilities.createImageElement(/* engine icon */));

      cardBottom.appendChild(
        utilities.createTextElement("h4", car.data.transmission)
      );
      cardBottom.appendChild(
        utilities.createTextElement("h4", car.data.mileage)
      );
      cardBottom.appendChild(utilities.createTextElement("h4", car.data.body));
      cardBottom.appendChild(utilities.createTextElement("h4", car.data.fuel));
      cardBottom.appendChild(
        utilities.createTextElement("h4", car.data.engine)
      );

      card.appendChild(cardBottom);
      this.cards.push(card);
    });
    //this.copiedCards = this.cards.slice();
  }
  filterCards(filter) {
    let cardsToFilter = this.cards.slice();

    if (Object.keys(filter).length === 0) {
      // No filter criteria, return all cards
      this.filteredCards = cardsToFilter;
      return;
    }

    if (filter.make) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card.querySelector(".card-top-car-names h1").textContent ===
          filter.make
        );
      });
    }

    if (filter.model) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card.querySelector(".card-top-car-names h2").textContent ===
          filter.model
        );
      });
    }

    if (filter.minPrice) {
      cardsToFilter = cardsToFilter.filter((card) => {
        const cardPrice = utilities.parsePrice(
          card.querySelector(".card-top-price h2").textContent,
          10
        );
        return filter.minPrice <= cardPrice;
      });
    }

    if (filter.maxPrice) {
      cardsToFilter = cardsToFilter.filter((card) => {
        const cardPrice = utilities.parsePrice(
          card.querySelector(".card-top-price h2").textContent,
          10
        );
        return filter.maxPrice >= cardPrice;
      });
    }

    this.filteredCards = cardsToFilter;
  }
  sortCards(sort) {
    let copiedCards = this.filteredCards.slice();
    if (sort === "highest") {
      this.sortedCards = copiedCards.sort((a, b) => {
        const priceA = utilities.parsePrice(
          a.querySelector(".card-top-price h2").textContent,
          10
        );
        const priceB = utilities.parsePrice(
          b.querySelector(".card-top-price h2").textContent,
          10
        );

        return priceB - priceA;
      });
    } else if (sort === "lowest") {
      this.sortedCards = copiedCards.sort((a, b) => {
        const priceA = utilities.parsePrice(
          a.querySelector(".card-top-price h2").textContent,
          10
        );
        const priceB = utilities.parsePrice(
          b.querySelector(".card-top-price h2").textContent,
          10
        );

        return priceA - priceB;
      });
    } else {
      this.sortedCards = this.filteredCards.slice();
    }
  }
  setItemsPerPage(itemsPerPage) {
    this.dataCards = utilities.divideArray(this.sortedCards, itemsPerPage);
  }
  getNumberOfPages() {
    return this.dataCards.length;
  }

  getCardElements(pageNumber) {
    return this.dataCards[pageNumber - 1];
  }
  loadCards(pageNumber) {
    this.dataCards[pageNumber - 1].forEach((card) => {
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
