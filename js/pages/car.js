import dataLoad from "../components/dataLoader.js";
import * as utilities from "../utilities.js";
import { carouselTemplate } from "../templates.js";
import CarSlide from "../components/carSlides.js";
import carousel from "../components/carousel.js";

window.addEventListener("load", () => {
  document.body.innerHTML += carouselTemplate;
  const carouselT = document.querySelector(`#carouselTemplate`);
  const clonedCarousel = carouselT.content.cloneNode(true);
  document.querySelector(".slide-carousel").appendChild(clonedCarousel);

  (async () => {
    const allDataArray = await dataLoad("./assets/json/cars.json");
    const data = allDataArray[0];
    const queryString = window.location.search;
    const queryParams = utilities.listenForQueries(queryString);

    //?id=2a8c8a7e-7449-41b5-a6de-9b41a746d1a8

    if (queryParams) {
      const keyID = queryParams.get("id");
      const key = data.filter((item) => item.keyID === keyID);
      if (key.length != 0) {
        const carElements = utilities.queryElements(
          true,
          false,
          "make",
          "model",
          "year",
          "mileage",
          "fuel",
          "body",
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
        carousel("[data-carousel-button]");

        carElements.make.innerText = key[0].data.make;
        carElements.model.innerText = key[0].data.model;
        carElements.year.innerText = key[0].data.year;
        carElements.mileage.innerText = key[0].data.mileage;
        carElements.fuel.innerText = key[0].data.fuel;
        carElements.body.innerText = key[0].data.body;
        carElements.price.innerText = `£${key[0].data.price}`;
        carElements.finance.innerText = `From £${Math.ceil(
          key[0].data.price / 48
        )} a month!`;
      } else {
        /* console.log(key);
        console.log(keyID); */
      }
    } else {
      // magic code to show missing message
    }
  })();
});
