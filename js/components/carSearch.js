import * as utilities from "../utilities.js";

export default class CarSearch {
  constructor(
    formElementClass,
    carMakesObjectArray,
    showMoreButton,
    additionalOptionsObject
  ) {
    this.formElement = document.querySelector(formElementClass);
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

  initialise() {
    const formElements = this.createCarSearchForm();
    this.setupEventListeners(...formElements);
  }

  setupEventListeners(...formElements) {}

  createCarSearchForm() {
    const formParentElement = this.formElement.parentElement;
    console.log(formParentElement);
    const selectMake = document.createElement("select");
    selectMake.appendChild(utilities.createOptionElement("", "Select Make"));

    const defaultOptionCarModel = utilities.createOptionElement(
      "",
      "Select Model"
    );
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
    // -----------------------------------------------------
    const selectMinPrice = document.createElement("select");
    selectMinPrice.appendChild(utilities.createOptionElement("", "Min Price"));
    this.priceValues.forEach((price) => {
      selectMinPrice.appendChild(
        utilities.createOptionElement(price, `£${price}`)
      );
    });
    const defaultMaxPrice = utilities.createOptionElement("", "Max Price");
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
        console.log(aboveSelected);
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
    selectMaxPrice.appendChild(defaultMaxPrice);
    this.priceValues.forEach((price) => {
      selectMaxPrice.appendChild(
        utilities.createOptionElement(price, `£${price}`)
      );
    });
    const searchButton = document.createElement("button");
    const searchIcon = utilities.createIconElement(
      "fa-solid",
      "fa-magnifying-glass"
    );
    searchButton.setAttribute("type", "submit");
    searchButton.dataset.expanded = "false";
    searchButton.appendChild(searchIcon);
    searchButton.appendChild(utilities.createTextElement("span", "Search"));

    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      let formData = {};

      formData.make = selectMake.value;
      formData.model = selectModel.value;
      formData.minPrice = selectMinPrice.value;
      formData.maxPrice = selectMaxPrice.value;
      formData.bodyStyle = selectBodyStyle.value;
      formData.fuelType = selectFuel.value;
      formData.transmission = selectTransmission.value;
      formData.numberOfDoors = selectNumberofDoors.value;
      formData.colour = selectColour.value;
      formData.engine = selectEngineSize.value;
      formData.taxBand = selectTaxBand.value;

      try {
        if (utilities.allKeysEmpty(formData)) {
          throw "At least one of the selectors needs to hold a value";
        } else {
          console.log(formData);
          let parameters = { page: 1, items: 16 };

          for (const key in formData) {
            if (formData.hasOwnProperty(key) && formData[key] !== "") {
              parameters[key] = formData[key];
            }
          }
          utilities.updateQueryParameters(
            `${window.location.href}/showroom.html`,
            true,
            { ...parameters }
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
    // end of Search button
    utilities.appendMultipleChildren(
      this.formElement,
      selectMake,
      selectModel,
      selectMinPrice,
      selectMaxPrice,
      searchButton
    );

    const selectBodyStyle = document.createElement("select");
    selectBodyStyle.appendChild(
      utilities.createOptionElement("", "Select Body Style")
    );

    this.additionalOptionsObject["bodyStyle"].forEach((body) => {
      selectBodyStyle.appendChild(
        utilities.createOptionElement(body, `${body}`)
      );
    });

    const selectFuel = document.createElement("select");
    selectFuel.appendChild(
      utilities.createOptionElement("", "Select Fuel Type")
    );

    this.additionalOptionsObject["fuelType"].forEach((fuel) => {
      selectFuel.appendChild(utilities.createOptionElement(fuel, `${fuel}`));
    });

    const selectTransmission = document.createElement("select");
    selectTransmission.appendChild(
      utilities.createOptionElement("", "Select Transmission")
    );

    this.additionalOptionsObject["transmissionTypes"].forEach(
      (Transmission) => {
        selectTransmission.appendChild(
          utilities.createOptionElement(Transmission, `${Transmission}`)
        );
      }
    );

    const selectNumberofDoors = document.createElement("select");
    selectNumberofDoors.appendChild(
      utilities.createOptionElement("", "Number of Doors")
    );

    this.additionalOptionsObject["doorNumber"].forEach((numberOfDoors) => {
      selectNumberofDoors.appendChild(
        utilities.createOptionElement(numberOfDoors, `${numberOfDoors}`)
      );
    });

    const selectColour = document.createElement("select");
    selectColour.appendChild(
      utilities.createOptionElement("", "Select Colour")
    );

    this.additionalOptionsObject["colours"].forEach((colour) => {
      selectColour.appendChild(
        utilities.createOptionElement(colour, `${colour}`)
      );
    });

    const selectEngineSize = document.createElement("select");
    selectEngineSize.appendChild(
      utilities.createOptionElement("", "Select Engine Size")
    );

    this.additionalOptionsObject["engineSizes"].forEach((engineSize, index) => {
      let text = null;
      if (index === 0) {
        text = `Up to ${engineSize.split(";")[1]}litre`;
      } else if (
        index ===
        this.additionalOptionsObject["engineSizes"].length - 1
      ) {
        text = `More than ${engineSize.split(";")[0]}litre`;
      } else {
        text = `${engineSize.split(";")[0]}litre to ${
          engineSize.split(";")[1]
        }litre`;
      }

      selectEngineSize.appendChild(
        utilities.createOptionElement(engineSize, text)
      );
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
    //selectBodyStyle,selectFuel,selectTransmission,selectNumberofDoors,selectColour,selectEngineSize,selectTaxBand
    const arrayOfSelectors = [
      selectBodyStyle,
      selectFuel,
      selectTransmission,
      selectNumberofDoors,
      selectColour,
      selectEngineSize,
      selectTaxBand,
    ];
    utilities.insertMultipleBefore(
      this.formElement,
      searchButton,
      ...arrayOfSelectors
    );
    utilities.changeStyleOfElements("display", "none", ...arrayOfSelectors);

    this.showMoreButton.addEventListener("click", () => {
      const optionsShownState =
        this.showMoreButton.getAttribute("options-visible");

      if (optionsShownState === "false") {
        this.showMoreButton.setAttribute(
          "options-visible",
          !eval(optionsShownState)
        );
        searchButton.dataset.expanded = "true";

        utilities.changeStyleOfElements(
          "display",
          "block",
          ...arrayOfSelectors
        );
        formParentElement.style.height = "540px";
        this.formElement.style.height = "400px";
      } else {
        this.showMoreButton.setAttribute(
          "options-visible",
          !eval(optionsShownState)
        );
        utilities.changeStyleOfElements("display", "none", ...arrayOfSelectors);
        searchButton.dataset.expanded = "false";

        formParentElement.style.height = "340px";
        this.formElement.style.height = "200px";
      }
    });
  }
}
