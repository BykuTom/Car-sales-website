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

export default async function fetchJSON(jsonURL) {
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
  return fetch(jsonURL)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching JSON:", error);
      throw error;
    });
}
