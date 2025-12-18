import * as commonFunctions from "./modules/functions.js";

commonFunctions.isWebp();

const btn = document.getElementById("theme-toggle");
btn.addEventListener("click", () => {
  const element = document.body;
  element.classList.toggle("dark-mode");
});
