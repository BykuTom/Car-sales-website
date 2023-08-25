export default class CarSearch {
  constructor(FormElementClass, carMakesObjectArray) {
    this.FormElement = document.querySelector(FormElementClass);
    this.carMakeModelsObjectArray = carMakesObjectArray;
  }

  createCarSearchForm() {
    const selectMake = document.createElement("select");
    const defaultOptionCarMake = document.createElement("option");
    defaultOptionCarMake.setAttribute("value", "");
    defaultOptionCarMake.textContent = "Select Make";
    selectMake.appendChild(defaultOptionCarMake);
    const defaultOptionCarModel = document.createElement("option");
    defaultOptionCarModel.setAttribute("value", "");
    defaultOptionCarModel.textContent = "Select Make";

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

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    this.FormElement.appendChild(selectMake);
    this.FormElement.appendChild(selectModel);
    this.FormElement.appendChild(searchButton);
  }
}
/* const selectBodyStyle = document.createElement("select");
    const selectFuel = document.createElement("select");
    const selectTransmission = document.createElement("select");
    const selectNumberofDoors = document.createElement("select");
    const selectColour = document.createElement("select");
    const selectEngineSize = document.createElement("select");
    const selectTaxBand = document.createElement("select");
    const searchButton = document.createElement("button"); */
