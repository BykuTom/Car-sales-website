import CarFactory from "./carFactory.js";
import dataLoad from "./dataLoader.js";
import * as utilities from "./utilities.js";

window.onload = function () {
  (async () => {
    const allDataArray = await dataLoad("./src/cars.json");
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
    let sortedElements = [];
    function updatePageButtons() {
      document.querySelector(".buttonContainer").innerHTML = "";

      for (let i = 1; i <= numberOfPages; i++) {
        const pageButton = utilities.createElement("button", "page-button");
        pageButton.innerText = `${i}`;
        pageButton.setAttribute("value", i);

        pageButton.addEventListener("click", () => {
          currentPage = parseInt(pageButton.getAttribute("value"));
          utilities.updateQueryParameters(window.location.href, {
            page: currentPage,
          });
          checkForQueries();
        });
        document.querySelector(".buttonContainer").appendChild(pageButton);
      }
    }
    function parsePrice(textContent) {
      const cleanedTextContent = textContent.trim().substring(1);
      return parseInt(cleanedTextContent, 10);
    }

    function sortCardElements(sort) {
      if (sort === "highest") {
        sortedElements = cardElements.sort((a, b) => {
          const priceA = parsePrice(
            a.querySelector(".card-top-price h2").textContent,
            10
          );
          const priceB = parsePrice(
            b.querySelector(".card-top-price h2").textContent,
            10
          );

          return priceB - priceA;
        });
        sortedElements.forEach((card) => {
          container.appendChild(card);
        });
      } else if (sort === "lowest") {
        sortedElements = cardElements.sort((a, b) => {
          const priceA = parsePrice(
            a.querySelector(".card-top-price h2").textContent,
            10
          );
          const priceB = parsePrice(
            b.querySelector(".card-top-price h2").textContent,
            10
          );

          return priceA - priceB;
        });
        sortedElements.forEach((card) => {
          container.appendChild(card);
        });
      } else {
        console.log("else");
        cardElements.forEach((card) => {
          container.appendChild(card);
        });
      }
    }
    function checkForQueries() {
      let queryString = window.location.search;
      let queryParams = utilities.listenForQueries(queryString);

      if (!queryParams) {
        utilities.updateQueryParameters(window.location.href, {
          page: currentPage,
        });
        utilities.updateQueryParameters(window.location.href, {
          items: 16,
        });
      } else {
        if (!queryParams.get("page")) {
          utilities.updateQueryParameters(window.location.href, {
            page: currentPage,
          });
        }
        if (!queryParams.get("items")) {
          utilities.updateQueryParameters(window.location.href, {
            items: 16,
          });
        }
        queryString = window.location.search;
        queryParams = utilities.listenForQueries(queryString);
        currentPage = parseInt(queryParams.get("page"));
        itemsToLoad = parseInt(queryParams.get("items"));
      }
      carFactory.setItemsPerPage(itemsToLoad);
      numberOfPages = carFactory.getNumberOfPages();
      if (currentPage > numberOfPages) {
        currentPage = numberOfPages;
        utilities.updateQueryParameters(window.location.href, {
          page: currentPage,
        });
      }
      container.innerHTML = "";
      cardElements = carFactory.getCardElements(currentPage);
      updatePageButtons();
      /* cardElements = container.querySelectorAll(".card"); */
      sortCardElements(sort);
    }

    checkForQueries();

    pageSizeSelect.addEventListener("change", () => {
      itemsToLoad = parseInt(
        pageSizeSelect.options[pageSizeSelect.selectedIndex].getAttribute(
          "value"
        )
      );
      utilities.updateQueryParameters(window.location.href, {
        items: itemsToLoad,
      });

      checkForQueries();
    });

    const sortSelector = document.querySelector("#SortBy");

    sortSelector.addEventListener("change", () => {
      sort =
        sortSelector.options[sortSelector.selectedIndex].getAttribute("value");
      checkForQueries();
    });
  })();
};

/* window.onpopstate = function (event) {
      checkForQueries();
      console.log("wokrs?");
    }; */

/* function lookForQuery() {
  const queryString = window.location.search;
  const queryParams = utilities.listenForQueries(queryString);
  if (queryParams) {
    const currentPage = parseInt(queryParams.get("page")[0]);
    carFactory.loadCards(itemsToLoad, currentPage);
  } else {
    utilities.updateQueryParameters(window.location.href, {
      page: currentPage,
    });
    carFactory.loadCards(itemsToLoad, currentPage);
  }
}

function updatePages() {
  document.querySelector(".buttonContainer").innerHTML = "";
  for (let i = 1; i <= numberOfPages; i++) {
    const pageButton = utilities.createElement("button", "page-button");
    pageButton.innerText = `${i}`;
    pageButton.setAttribute("value", i);
    pageButton.addEventListener("click", () => {
      currentPage = parseInt(pageButton.getAttribute("value"));
      document.querySelector(".container").innerHTML = "";

      carFactory.loadCards(itemsToLoad, currentPage);
    });
    document.querySelector(".buttonContainer").appendChild(pageButton);
    //insertBefore(pageButton, document.querySelector(".next"));
  }
}

carFactory.loadCards(itemsToLoad, 1);
numberOfPages = carFactory.getNumberOfPages();
lookForQuery();
updatePages();

if (currentPage >= numberOfPages) {
  currentPage = numberOfPages;
  utilities.updateQueryParameters(window.location.href, {
    page: currentPage,
  });
}

const pageSizeSelect = document.querySelector("#pageSize");
pageSizeSelect.addEventListener("change", () => {
  itemsToLoad = parseInt(
    pageSizeSelect.options[pageSizeSelect.selectedIndex].getAttribute(
      "value"
    )
  );
  utilities.updateQueryParameters(window.location.href, {
    page: currentPage,
  });
  updatePages();
}); */
