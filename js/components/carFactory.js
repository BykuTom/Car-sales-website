import * as utilities from "../utilities.js";

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
      cardBottom.appendChild(
        utilities.createImageElement(
          "./assets/images/icons/manual-transmissionColour.png"
        )
      );
      cardBottom.appendChild(
        utilities.createImageElement(
          "./assets/images/icons/speedometerColour.png"
        )
      );
      cardBottom.appendChild(
        utilities.createImageElement("./assets/images/icons/chassisColor.png")
      );
      cardBottom.appendChild(
        utilities.createImageElement("./assets/images/icons/fuelColor.png")
      );
      cardBottom.appendChild(
        utilities.createImageElement("./assets/images/icons/engineColour.png")
      );

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

      const cardHidden = utilities.createElement("div", "hidden-info");
      cardHidden.appendChild(
        utilities.createTextElement("h4", car.data.colour)
      );
      cardHidden.appendChild(
        utilities.createTextElement("h4", car.data.numberOfDoors)
      );
      cardHidden.appendChild(
        utilities.createTextElement("h4", car.data.taxband)
      );
      //  TODO: add these to filter and hide them in css
      card.appendChild(cardHidden);
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
    if (filter.body) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card
            .querySelector(".card-bottom h4:nth-child(8)")
            .textContent.toLowerCase() === filter.body.toLowerCase()
        );
      });
    }
    if (filter.fuel) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card.querySelector(".card-bottom h4:nth-child(9)").textContent ===
          filter.fuel
        );
      });
    }
    if (filter.transmission) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card
            .querySelector(".card-bottom h4:nth-child(6)")
            .textContent.toLowerCase() === filter.transmission.toLowerCase()
        );
      });
    }
    if (filter.doors) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card
            .querySelector(".hidden-info h4:nth-child(2)")
            .textContent.toLowerCase() === filter.doors.toLowerCase()
        );
      });
    }
    if (filter.colour) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card
            .querySelector(".hidden-info h4:nth-child(1)")
            .textContent.toLowerCase() === filter.colour.toLowerCase()
        );
      });
    }
    if (filter.engine) {
      cardsToFilter = cardsToFilter.filter((card) => {
        const filterValues = filter.engine.split(";");
        const engineValues = card
          .querySelector(".card-bottom h4:nth-child(10)")
          .textContent.substring(
            0,
            card
              .querySelector(".card-bottom h4:nth-child(10)")
              .textContent.indexOf("L")
          );

        if (parseFloat(engineValues) != NaN) {
          return (
            parseFloat(filterValues[0]) <= parseFloat(engineValues) &&
            parseFloat(engineValues) <= parseFloat(filterValues[1])
          );
        }
      });
    }
    if (filter.taxBand) {
      cardsToFilter = cardsToFilter.filter((card) => {
        return (
          card
            .querySelector(".hidden-info h4:nth-child(3)")
            .textContent.toLowerCase() === filter.taxBand.toLowerCase()
        );
      });
    }

    this.filteredCards = cardsToFilter;
  }
  sortCards(sort) {
    let copiedCards = this.filteredCards.slice();
    if (sort === "year") {
      this.sortedCards = copiedCards.sort((a, b) => {
        const yearA = parseInt(
          a.querySelector(".card-top-car-names h3").textContent,
          10
        );
        const yearB = parseInt(
          b.querySelector(".card-top-car-names h3").textContent,
          10
        );
        return yearB - yearA;
      });
    } else if (sort === "mileage") {
      this.sortedCards = copiedCards.sort((a, b) => {
        const mileageA = parseInt(
          a.querySelector(".card-bottom h4:nth-child(7)").textContent,
          10
        );
        const mileageB = parseInt(
          b.querySelector(".card-bottom h4:nth-child(7)").textContent,
          10
        );

        return mileageA - mileageB;
      });
    } else if (sort === "highest") {
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
