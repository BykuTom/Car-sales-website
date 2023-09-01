import dataLoad from "./dataLoader.js";
import { listenForQueries } from "./utilities.js";

window.addEventListener("load", () => {
  (async () => {
    const allDataArray = await dataLoad("./src/cars.json");
    const data = allDataArray[0];

    const queryString = window.location.search;

    const queryParams = listenForQueries(queryString);

    if (queryParams) {
      const keyID = queryParams.get("id");
      const key = data.filter((item) => item.keyID === keyID);
      if (key.length != 0) {
        console.log("succsess" + key);
        console.log(key[0]);
      } else {
        console.log(key);
        console.log(keyID);
        console.log("suc");
      }
    } else {
      console.log("empty");
      // magic code to show missing message
    }
  })();
});
