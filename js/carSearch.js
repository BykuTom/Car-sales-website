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

  createCarSearchForm() {
    const selectMake = document.createElement("select");
    const defaultOptionCarMake = document.createElement("option");
    defaultOptionCarMake.setAttribute("value", "");
    defaultOptionCarMake.textContent = "Select Make";
    selectMake.appendChild(defaultOptionCarMake);
    const defaultOptionCarModel = document.createElement("option");
    defaultOptionCarModel.setAttribute("value", "");
    defaultOptionCarModel.textContent = "Select Model";

    this.carMakeModelsObjectArray.forEach((object) => {
      const optionCarMake = document.createElement("option");
      optionCarMake.setAttribute("value", object.make);
      optionCarMake.textContent = object.make;
      selectMake.appendChild(optionCarMake);
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
          const optionModel = document.createElement("option");
          optionModel.setAttribute("value", model);
          optionModel.textContent = model; // Set text content
          selectModel.appendChild(optionModel);
        });
      } else {
        selectModel.appendChild(defaultOptionCarModel);
      }
    });

    const selectModel = document.createElement("select");
    selectModel.appendChild(defaultOptionCarModel);
    // min max price selectors
    const selectMinPrice = document.createElement("select");
    const defaultMinPrice = document.createElement("option");
    defaultMinPrice.setAttribute("value", "");
    defaultMinPrice.textContent = "Min Price";
    selectMinPrice.appendChild(defaultMinPrice);
    this.priceValues.forEach((price) => {
      const optionMinPrice = document.createElement("option");
      optionMinPrice.setAttribute("value", price);
      optionMinPrice.textContent = `£${price}`;
      selectMinPrice.appendChild(optionMinPrice);
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
        console.log(aboveSelected);
        selectMaxPrice.appendChild(defaultMaxPrice);
        aboveSelected.forEach((price) => {
          const optionMaxPrice = document.createElement("option");
          optionMaxPrice.setAttribute("value", price);
          optionMaxPrice.textContent = `£${price}`;
          selectMaxPrice.appendChild(optionMaxPrice);
          console.log("hey");
        });
      } else {
        selectMaxPrice.appendChild(defaultMaxPrice);
        this.priceValues.forEach((price) => {
          const optionMaxPrice = document.createElement("option");
          optionMaxPrice.setAttribute("value", price);
          optionMaxPrice.textContent = `£${price}`;
          selectMaxPrice.appendChild(optionMaxPrice);
        });
      }
    });

    const selectMaxPrice = document.createElement("select");
    const defaultMaxPrice = document.createElement("option");

    defaultMaxPrice.setAttribute("value", "");
    defaultMaxPrice.textContent = "Max Price";
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

    searchButton.addEventListener("click", (event) => {
      event.preventDefault;
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

    this.additionalOptionsObject["engineSizes"].forEach((engineSize) => {
      const optionEngineSize = document.createElement("option");
      optionEngineSize.setAttribute("value", engineSize);
      optionEngineSize.textContent = `${engineSize}`;
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

    this.showMoreButton.addEventListener("click", () => {
      const optionsShownState =
        this.showMoreButton.getAttribute("optionsShown");

      if (optionsShownState === "false") {
        this.showMoreButton.setAttribute(
          "optionsShown",
          !eval(optionsShownState)
        );
        this.FormElement.insertBefore(selectBodyStyle, searchButton);
        this.FormElement.insertBefore(selectFuel, searchButton);
        this.FormElement.insertBefore(selectTransmission, searchButton);
        this.FormElement.insertBefore(selectNumberofDoors, searchButton);
        this.FormElement.insertBefore(selectColour, searchButton);
        this.FormElement.insertBefore(selectEngineSize, searchButton);
        this.FormElement.insertBefore(selectTaxBand, searchButton);
        searchButton.dataset.expanded = "true";
      } else {
        this.showMoreButton.setAttribute(
          "optionsShown",
          !eval(optionsShownState)
        );
        this.FormElement.removeChild(selectBodyStyle);
        this.FormElement.removeChild(selectFuel);
        this.FormElement.removeChild(selectTransmission);
        this.FormElement.removeChild(selectColour);
        this.FormElement.removeChild(selectNumberofDoors);
        this.FormElement.removeChild(selectEngineSize);
        this.FormElement.removeChild(selectTaxBand);
        searchButton.dataset.expanded = "false";
      }
    });
  }
}
/* 
    
    
    
    
    
    const selectTaxBand = document.createElement("select");
    const searchButton = document.createElement("button"); */
