import * as commonFunctions from "./modules/functions.js";
// import { toggleNav } from "./modules/burger.js";

commonFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function () {
  // burger menu
  document.querySelector(".burger").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".burger__nav").classList.toggle("open");
  });

  // year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("dataFooter").textContent = currentYear;
});
