export function parsePrice(textContent) {
  const cleanedTextContent = textContent.trim().substring(1);
  return parseInt(cleanedTextContent, 10);
}
export function appendMultipleChildren(parentElement, ...children) {
  const parent = parentElement;
  children.forEach((child) => {
    parent.appendChild(child);
  });
  return parent;
}
export function insertMultipleBefore(parentElement, childElement, ...children) {
  const parent = parentElement;
  children.forEach((child) => {
    parent.insertBefore(child, childElement);
  });
  return parent;
}
export function allKeysEmpty(object) {
  for (const key in object) {
    if (object[key] !== "") {
      return false;
    }
  }
  return true;
}
export function changeStyleOfElements(property, value, ...elements) {
  elements.forEach((element) => {
    element.style[property] = value;
  });
}
export function updateQueryParameters(
  currentURL,
  loadPage,
  ...paramValuePairs
) {
  try {
    const url = new URL(currentURL);
    paramValuePairs.forEach((paramValuePair) => {
      for (const key in paramValuePair) {
        if (paramValuePair.hasOwnProperty(key)) {
          const value = paramValuePair[key];
          url.searchParams.set(key, value); // Use key and value here
        }
      }
    });
    if (loadPage) {
      window.location.href = url.toString();
    }
    history.pushState("null", "null", url.toString());
  } catch (error) {
    console.error("Error updating query parameters:", error);
  }
}

export function queryElements(isClass, isId, ...elements) {
  const queriedElements = {};

  elements.forEach((element) => {
    if (isClass) {
      queriedElements[element] = document.querySelector(`.${element}`);
    } else if (isId) {
      queriedElements[element] = document.querySelector(`#${element}`);
    } else {
      queriedElements[element] = document.querySelector(element);
    }
  });

  return queriedElements;
}

export function listenForQueries(queryString) {
  const queryParams = new URLSearchParams(queryString);
  if (queryParams.size === 0) {
    return null;
  } else return queryParams;
}
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
export function createOptionElement(value, textContent) {
  const option = document.createElement("option");
  option.setAttribute("value", value);
  option.textContent = textContent;
  return option;
}
export function createLinkElement(tagName, href) {
  const element = document.createElement(tagName);
  element.setAttribute("href", href);
  return element;
}
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
export function createIconElement(...classes) {
  const icon = document.createElement("i");
  classes.forEach((className) => {
    icon.classList.add(className);
  });
  return icon;
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
