/* function jsonToObject(JSON) {
  let object = {};
  fetch(JSON)
    .then((response) => response.json())
    .then((data) => {
      object = data;
    })
    .catch((error) => {
      console.error("Error fetching JSONJ:", error);
    });

  return object;
}
function jsonToArray(JSON) {
  let array = [];
  fetch(JSON)
    .then((response) => response.json())
    .then((data) => {
      array = data;
    })
    .catch((error) => {
      console.error("Error fetching JSONJ:", error);
    });

  return array;
} */

export async function fetchJSON(jsonURL) {
  return fetch(jsonURL)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching JSON:", error);
      throw error;
    });
}
export function splitArray(array, startIndex, endIndex) {
  const requestedItems = array.slice(startIndex, endIndex + 1);
  const remainingItems = array.slice(endIndex + 1);
  return { requestedItems, remainingItems };
}
export function toLocalStorage(data, key) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(key, jsonData);
}
export function getLocalStorageData(key) {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const retrievedData = JSON.parse(storedData);
    return retrievedData;
  }
  return undefined;
}

export function jsonToLocalStorage(jsonData) {}
export function createElement(tagName, className, id) {
  const element = document.createElement(tagName);
  if (className) element.classList.add(className);
  if (id) element.setAttribute("id", id);
  return element;
}

export function createTextElement(tagName, text) {
  const element = document.createElement(tagName);
  element.innerText = text;
  return element;
}

export function createImageElement(src, alt) {
  const element = document.createElement("img");
  element.setAttribute("src", src);
  element.setAttribute("alt", alt);
  return element;
}

export function divideArray(inputArray, indexNumber) {
  let oldArray = [...inputArray];
  let newArrayofArrays = [];
  let division = Math.ceil(oldArray.length / indexNumber);

  for (let i = 0; i < division; i++) {
    let result;

    if (oldArray.length >= indexNumber) {
      result = splitArray(oldArray, 0, indexNumber - 1);
      newArrayofArrays.push(result.requestedItems);
      oldArray = result.remainingItems;
    } else {
      newArrayofArrays.push(oldArray);
      break;
    }
  }
  return newArrayofArrays;
}

export function returnRandomKey() {
  const randomValues = new Uint8Array(20);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (byte) => byte.toString(16)).join("");
}

/* export function toJSON(Item) {
  const jsonData = JSON.stringify((Item, null, 2));

  const blob = new Blob([jsonData], { type: application / json });
  const url = URL.createObjectURL(blob);
} */
/* let data;
try {
  data = await fetch(jsonURL)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching JSON:", error);
      throw error;
    });
} catch (error) {
  console.error("An error occurred:", error);
}
return data; */
