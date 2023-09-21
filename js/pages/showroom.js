import CarFactory from "../components/carFactory.js";
import dataLoad from "../components/dataLoader.js";
import * as utilities from "../utilities.js";

window.onload = async () => {
  const allDataArray = await dataLoad("./assets/json/cars.json");
  const onPageNumberDisplay = document.querySelector(
    ".page-bottom-number-of-pages"
  );
  const pageButtons = document
    .querySelector(".pageButtons")
    .querySelectorAll("button");
  /*  .forEach((node) => {
      node.addEventListener(() => {
        utilities.updateQueryParameters(window.location.href, undefined, {
          page: currentPage + parseInt(node.value),
        });
        console.log(currentPage + parseInt(node.value));
      });
    }); */
  const data = allDataArray[0];
  let itemsToLoad = 16;
  let currentPage = 1;
  let numberOfPages = 1;
  let sort = null;
  const container = document.querySelector(".container");
  const pageSizeSelect = document.querySelector("#pageSize");
  const carFactory = new CarFactory(data, itemsToLoad, ".container");
  carFactory.createCards();
  let cardElements = [];
  let filterParams = {};

  const updatePageButtons = () => {
    const buttonContainer = document.querySelector(".buttonContainer");
    buttonContainer.innerHTML = "";
    for (let i = 1; i <= numberOfPages; i++) {
      const pageButton = utilities.createElement("button", "page-button");
      pageButton.innerText = `${i}`;
      pageButton.value = i;
      pageButton.appendChild(utilities.createLinkElement("a", "#"));
      pageButton.addEventListener("click", () => {
        currentPage = parseInt(pageButton.value);
        utilities.updateQueryParameters(window.location.href, undefined, {
          page: currentPage,
        });
        checkForQueries();
      });
      onPageNumberDisplay.innerText = `${currentPage} out of ${numberOfPages}`;
      buttonContainer.appendChild(pageButton);
    }
  };

  const loadCards = () => {
    carFactory.sortCards(sort);
    carFactory.setItemsPerPage(itemsToLoad);

    numberOfPages = carFactory.getNumberOfPages();

    if (currentPage > numberOfPages) {
      currentPage = numberOfPages;
      utilities.updateQueryParameters(window.location.href, undefined, {
        page: currentPage,
      });
    }
    container.innerHTML = "";

    cardElements = carFactory.getCardElements(currentPage);

    updatePageButtons();

    if (cardElements) {
      cardElements.forEach((card) => {
        container.appendChild(card);
      });
    } else {
      const missingItemMessageDiv = utilities.createElement(
        "div",
        "missing-items-message"
      );
      missingItemMessageDiv.appendChild(
        utilities.createTextElement(
          "h2",
          "Sorry, the results you're looking for can't be found."
        )
      );
      missingItemMessageDiv.appendChild(
        utilities.createImageElement(
          "./assets/images/icons/carSearchBlue.png",
          "LookingForCar icon"
        )
      );
      container.appendChild(missingItemMessageDiv);
    }
  };

  const checkForQueries = () => {
    let queryString = window.location.search;
    let queryParams = utilities.listenForQueries(queryString);
    if (!queryParams) {
      utilities.updateQueryParameters(window.location.href, undefined, {
        page: 1,
        items: 16,
      });
    } else {
      if (!queryParams.get("page") || parseInt(queryParams.get("page")) < 1) {
        utilities.updateQueryParameters(window.location.href, undefined, {
          page: currentPage,
        });
      }
      if (!queryParams.get("items")) {
        utilities.updateQueryParameters(window.location.href, undefined, {
          items: 16,
        });
      }
    }
    queryString = window.location.search;
    queryParams = utilities.listenForQueries(queryString);
    currentPage = parseInt(queryParams.get("page"));
    itemsToLoad = parseInt(queryParams.get("items"));

    const filterParamsMapping = {
      make: "make",
      model: "model",
      minPrice: "minPrice",
      maxPrice: "maxPrice",
      body: "body",
      fuel: "fuel",
      transmission: "transmission",
      doors: "doors",
      colour: "colour",
      engine: "engine",
      taxBand: "taxBand",
    };

    for (const key in filterParamsMapping) {
      const paramName = filterParamsMapping[key];
      const paramValue = queryParams.get(paramName);

      if (paramValue !== null) {
        if (paramName === "minPrice" || paramName === "maxPrice") {
          filterParams[paramName] = parseInt(paramValue);
        } else {
          filterParams[paramName] = paramValue;
        }
      }
    }

    carFactory.filterCards(filterParams);
    loadCards();
  };

  checkForQueries();

  pageSizeSelect.addEventListener("change", () => {
    itemsToLoad = parseInt(pageSizeSelect.value);
    utilities.updateQueryParameters(window.location.href, undefined, {
      items: itemsToLoad,
    });

    checkForQueries();
  });

  const sortSelector = document.querySelector("#SortBy");

  sortSelector.addEventListener("change", () => {
    sort = sortSelector.value;
    checkForQueries();
  });
};
