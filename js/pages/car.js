import dataLoad from "../components/dataLoader.js";
import * as utilities from "../utilities.js";
/* import { carouselTemplate } from "../templates.js"; */
import CarSlide from "../components/carSlides.js";
import carousel from "../components/carousel.js";
import accordion from "../components/accordion.js";

window.addEventListener("load", () => {
  /* document.body.innerHTML += carouselTemplate;
  const carouselT = document.querySelector(`#carouselTemplate`);
  const clonedCarousel = carouselT.content.cloneNode(true);
  document.querySelector(".slide-carousel").appendChild(clonedCarousel); */

  // The above code causes issue.

  (async () => {
    const allDataArray = await dataLoad("./assets/json/cars.json");
    const data = allDataArray[0];
    const queryString = window.location.search;
    const queryParams = utilities.listenForQueries(queryString);
    const keyInfo = document.querySelector(".key-info");

    if (queryParams) {
      const keyID = queryParams.get("id");
      const key = data.filter((item) => item.keyID === keyID);
      if (key.length != 0) {
        const carElements = utilities.queryElements(
          true,
          false,
          "title-year",
          "title-make",
          "title-model",
          "price",
          "finance"
        );
        let firstObject = true;

        key[0].data.imageURLs.forEach((imageURL) => {
          console.log(imageURL);
          const newSlide = new CarSlide(
            key[0].data.make,
            key[0].data.price,
            ".carousel",
            `#`,
            imageURL
          );
          console.log(newSlide);

          if (!firstObject) {
            newSlide.createListItem();
          } else {
            newSlide.createListItem("data-active");
            firstObject = false;
          }
        });
        const keyData = [
          key[0].data.mileage,
          key[0].data.numberOfDoors,
          key[0].data.transmission,
          key[0].data.engine,
          key[0].data.body,
          key[0].data.fuel,
          key[0].data.colour,
          key[0].data.taxband,
        ];
        keyData.forEach((value) => {
          keyInfo.appendChild(
            utilities.appendMultipleChildren(
              utilities.createElement("div", "key-info-item"),
              utilities.createTextElement(
                "h2",
                `${utilities.getKeyByValue(key[0].data, value)}`
              ),
              utilities.createTextElement("h3", `${value}`)
            )
          );
        });
        carousel("[data-carousel-button]");
        accordion("accordion-description", key[0].data.description);
        accordion("accordion-history", key[0].data.history);
        accordion("accordion-specifications", JSON.stringify(key[0].data));
        console.log(carElements);
        carElements["title-year"].innerText = key[0].data.year;
        carElements["title-make"].innerText = key[0].data.make;
        carElements["title-model"].innerText = key[0].data.model;
        carElements.price.innerText = `£${key[0].data.price}`;
        carElements.finance.innerText = `From £${Math.ceil(
          key[0].data.price / 48
        )} a month!`;
        /*  carElements.year.innerText = ;
        carElements.mileage.innerText = ;
        carElements.fuel.innerText = key[0].data.fuel;
        carElements.body.innerText = key[0].data.body; */
      } else {
        /* console.log(key);
        console.log(keyID); */
      }
    } else {
      // magic code to show missing message
    }
  })();
});
