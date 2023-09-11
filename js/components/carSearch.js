import * as utilities from "../utilities.js";

export default class CarSearch {
  constructor(
    FormElementClass,
    carMakesObjectArray,
    showMoreButton,
    additionalOptionsObject
  ) {
    this.FormElement = document.querySelector(FormElementClass);
    this.carMakeModelsObjectArray = carMakesObjectArray;
    this.showMoreButton = document.querySelector(showMoreButton);
    this.additionalOptionsObject = additionalOptionsObject;
  }
  priceValues = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000,
    16000, 18000, 20000, 22500, 25000, 27500, 30000, 35000, 40000, 45000, 50000,
    55000, 60000, 65000,
  ];
  expandedSelectors = [];

  createCarSearchForm() {
    const selectMake = document.createElement("select");
    const defaultOptionCarMake = utilities.createOptionElement(
      "",
      "Select Make"
    );
    selectMake.appendChild(defaultOptionCarMake);
    const defaultOptionCarModel = utilities.createOptionElement(
      "",
      "Select Model"
    );

    function allKeysEmpty(object) {
      for (const key in object) {
        if (object[key] !== "") {
          return false;
        }
      }
      return true;
    }
    // TODO: use createOptionElement
    this.carMakeModelsObjectArray.forEach((object) => {
      selectMake.appendChild(
        utilities.createOptionElement(object.make, object.make)
      );
    });

    selectMake.addEventListener("change", () => {
      const selectedMake = selectMake.value;
      const selectedMakeObject = this.carMakeModelsObjectArray.find(
        (object) => object.make === selectedMake
      );

      selectModel.innerHTML = "";
      selectModel.appendChild(defaultOptionCarModel);

      if (selectedMakeObject) {
        selectedMakeObject.models.forEach((model) => {
          selectModel.appendChild(utilities.createOptionElement(model, model));
        });
      } else {
        selectModel.appendChild(defaultOptionCarModel);
      }
    });

    const selectModel = document.createElement("select");
    selectModel.appendChild(defaultOptionCarModel);

    const selectMinPrice = document.createElement("select");
    selectMinPrice.appendChild(utilities.createOptionElement("", "Min Price"));
    this.priceValues.forEach((price) => {
      selectMinPrice.appendChild(
        utilities.createOptionElement(price, `£${price}`)
      );
    });

    selectMinPrice.addEventListener("change", () => {
      const selectedOption =
        selectMinPrice.options[selectMinPrice.selectedIndex];
      selectMaxPrice.innerHTML = "";

      if (selectedOption.getAttribute("value") !== "") {
        const minprice = parseInt(selectedOption.getAttribute("value"));
        const arrayIndex = this.priceValues.indexOf(minprice);
        let aboveSelected = this.priceValues.slice(
          arrayIndex + 1,
          this.priceValues.length
        );
        selectMaxPrice.appendChild(defaultMaxPrice);
        aboveSelected.forEach((price) => {
          selectMaxPrice.appendChild(
            utilities.createOptionElement(price, `£${price}`)
          );
        });
      } else {
        selectMaxPrice.appendChild(defaultMaxPrice);
        this.priceValues.forEach((price) => {
          selectMaxPrice.appendChild(
            utilities.createOptionElement(price, `£${price}`)
          );
        });
      }
    });

    const selectMaxPrice = document.createElement("select");
    const defaultMaxPrice = utilities.createOptionElement("", "Max Price");

    selectMaxPrice.appendChild(defaultMaxPrice);
    this.priceValues.forEach((price) => {
      const optionMaxPrice = document.createElement("option");
      optionMaxPrice.setAttribute("value", price);
      optionMaxPrice.textContent = `£${price}`;
      selectMaxPrice.appendChild(optionMaxPrice);
    });

    // Search button
    const searchButton = document.createElement("button");
    const searchIcon = document.createElement("i");
    searchButton.setAttribute("type", "submit");
    searchButton.dataset.expanded = "false";
    searchIcon.classList.add("fa-solid");
    searchIcon.classList.add("fa-magnifying-glass");
    const searchSpan = document.createElement("span");
    searchSpan.textContent = "Search";
    searchButton.appendChild(searchIcon);
    searchButton.appendChild(searchSpan);

    /* searchButton.addEventListener("click", (event) => {
      event.preventDefault();
      let dataForm = {};
      // TODO: Data needs to be packed into an object
    }); */

    this.FormElement.addEventListener("submit", (event) => {
      event.preventDefault();
      let formData = {};

      formData.make = selectMake.value;
      formData.model = selectModel.value;
      formData.minPrice = selectMinPrice.value;
      formData.maxPrice = selectMaxPrice.value;

      console.log(eval(searchButton.dataset.expanded));
      if (eval(searchButton.dataset.expanded)) {
        formData.bodyStyle = selectBodyStyle.value;
        formData.fuelType = selectFuel.value;
        formData.transmission = selectTransmission.value;
        formData.numberOfDoors = selectNumberofDoors.value;
        formData.colour = selectColour.value;
        formData.engine = selectEngineSize.value;
        formData.taxBand = selectTaxBand.value;
      }
      try {
        if (allKeysEmpty(formData)) {
          throw "At least one of the selectors needs to hold a value";
        } else {
          console.log(formData);
          //TODO: This is where the magic happens for query paramenters
          let parameters = { page: 1, items: 16 };

          for (const key in formData) {
            if (formData.hasOwnProperty(key) && formData[key] !== "") {
              parameters[key] = formData[key];
            }
          }
          utilities.updateQueryParameters(
            `${window.location.origin}/showroom.html`,
            true,
            { ...parameters }
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
    // end of Search button

    this.FormElement.appendChild(selectMake);
    this.FormElement.appendChild(selectModel);
    this.FormElement.appendChild(selectMinPrice);
    this.FormElement.appendChild(selectMaxPrice);
    this.FormElement.appendChild(searchButton);

    // selectBodyStyle >
    const selectBodyStyle = document.createElement("select");
    const defaultBodyStyle = document.createElement("option");
    //selectBodyStyle.innerHTML = "";
    defaultBodyStyle.setAttribute("value", "");
    defaultBodyStyle.textContent = "Select Body Style";
    selectBodyStyle.appendChild(defaultBodyStyle);

    this.additionalOptionsObject["bodyStyle"].forEach((body) => {
      const optionBodyStyle = document.createElement("option");
      optionBodyStyle.setAttribute("value", body);
      optionBodyStyle.textContent = `${body}`;
      selectBodyStyle.appendChild(optionBodyStyle);
    });

    // selectFuel >
    const selectFuel = document.createElement("select");
    const defaultFuel = document.createElement("option");
    //defaultFuel.innerHTML = "";
    defaultFuel.setAttribute("value", "");
    defaultFuel.textContent = "Select Fuel Type";
    selectFuel.appendChild(defaultFuel);

    this.additionalOptionsObject["fuelType"].forEach((fuel) => {
      const optionFuel = document.createElement("option");
      optionFuel.setAttribute("value", fuel);
      optionFuel.textContent = `${fuel}`;
      selectFuel.appendChild(optionFuel);
    });

    // selectTransmission >
    const selectTransmission = document.createElement("select");
    const defaultTransmission = document.createElement("option");
    // defaultTransmission.innerHTML = "";
    defaultTransmission.setAttribute("value", "");
    defaultTransmission.textContent = "Select Transmission";
    selectTransmission.appendChild(defaultTransmission);

    this.additionalOptionsObject["transmissionTypes"].forEach(
      (Transmission) => {
        const optionTransmission = document.createElement("option");
        optionTransmission.setAttribute("value", Transmission);
        optionTransmission.textContent = `${Transmission}`;
        selectTransmission.appendChild(optionTransmission);
      }
    );

    // selectNumberOfDoors
    const selectNumberofDoors = document.createElement("select");
    const defaultNumberofDoors = document.createElement("option");
    //defaultNumberofDoors.innerHTML = "";
    defaultNumberofDoors.setAttribute("value", "");
    defaultNumberofDoors.textContent = "Number of Doors";
    selectNumberofDoors.appendChild(defaultNumberofDoors);

    this.additionalOptionsObject["doorNumber"].forEach((numberOfDoors) => {
      const optionNumberOfDoors = document.createElement("option");
      optionNumberOfDoors.setAttribute("value", numberOfDoors);
      optionNumberOfDoors.textContent = `${numberOfDoors}`;
      selectNumberofDoors.appendChild(optionNumberOfDoors);
    });

    const selectColour = document.createElement("select");
    const defaultColour = document.createElement("option");
    defaultColour.setAttribute("value", "");
    defaultColour.textContent = "Select Colour";
    selectColour.appendChild(defaultColour);

    this.additionalOptionsObject["colours"].forEach((colour) => {
      const optionColour = document.createElement("option");
      optionColour.setAttribute("value", colour);
      optionColour.textContent = `${colour}`;
      selectColour.appendChild(optionColour);
    });

    const selectEngineSize = document.createElement("select");
    const defaultEngineSize = document.createElement("option");
    defaultEngineSize.setAttribute("value", "");
    defaultEngineSize.textContent = "Select Engine Size";
    selectEngineSize.appendChild(defaultEngineSize);

    this.additionalOptionsObject["engineSizes"].forEach((engineSize, index) => {
      const optionEngineSize = document.createElement("option");
      optionEngineSize.setAttribute("value", engineSize);
      if (index === 0) {
        optionEngineSize.textContent = `Up to ${engineSize.split(";")[1]}litre`;
      } else if (
        index ===
        this.additionalOptionsObject["engineSizes"].length - 1
      ) {
        optionEngineSize.textContent = `More than ${
          engineSize.split(";")[0]
        }litre`;
      } else {
        optionEngineSize.textContent = `${engineSize.split(";")[0]}litre to ${
          engineSize.split(";")[1]
        }litre`;
      }

      selectEngineSize.appendChild(optionEngineSize);
    });

    const selectTaxBand = document.createElement("select");
    selectTaxBand.setAttribute("lastElement", "");
    const defaultTaxBand = document.createElement("option");
    defaultTaxBand.setAttribute("value", "");
    defaultTaxBand.textContent = "Select Tax band";
    selectTaxBand.appendChild(defaultTaxBand);

    this.additionalOptionsObject["taxBands"].forEach((taxband) => {
      const optionTaxBand = document.createElement("option");
      optionTaxBand.setAttribute("value", taxband);
      optionTaxBand.textContent = `Band ${taxband}`;
      selectTaxBand.appendChild(optionTaxBand);
    });

    this.FormElement.insertBefore(selectBodyStyle, searchButton);
    this.FormElement.insertBefore(selectFuel, searchButton);
    this.FormElement.insertBefore(selectTransmission, searchButton);
    this.FormElement.insertBefore(selectNumberofDoors, searchButton);
    this.FormElement.insertBefore(selectColour, searchButton);
    this.FormElement.insertBefore(selectEngineSize, searchButton);
    this.FormElement.insertBefore(selectTaxBand, searchButton);

    selectBodyStyle.style.display = "none";
    selectFuel.style.display = "none";
    selectTransmission.style.display = "none";
    selectNumberofDoors.style.display = "none";
    selectColour.style.display = "none";
    selectEngineSize.style.display = "none";
    selectTaxBand.style.display = "none";

    this.showMoreButton.addEventListener("click", () => {
      const optionsShownState =
        this.showMoreButton.getAttribute("optionsShown");

      if (optionsShownState === "false") {
        this.showMoreButton.setAttribute(
          "optionsShown",
          !eval(optionsShownState)
        );
        selectBodyStyle.style.display = "block";
        selectFuel.style.display = "block";
        selectTransmission.style.display = "block";
        selectNumberofDoors.style.display = "block";
        selectColour.style.display = "block";
        selectEngineSize.style.display = "block";
        selectTaxBand.style.display = "block";
        searchButton.dataset.expanded = "true";
        document.querySelector(".carSearchSection").style.height = "505px";
        this.FormElement.style.height = "354px";
      } else {
        this.showMoreButton.setAttribute(
          "optionsShown",
          !eval(optionsShownState)
        );
        selectBodyStyle.style.display = "none";
        selectFuel.style.display = "none";
        selectTransmission.style.display = "none";
        selectNumberofDoors.style.display = "none";
        selectColour.style.display = "none";
        selectEngineSize.style.display = "none";
        selectTaxBand.style.display = "none";

        searchButton.dataset.expanded = "false";
        document.querySelector(".carSearchSection").style.height = "305px";
        this.FormElement.style.height = "154px";
      }
    });
  }
}
