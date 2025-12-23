import * as commonFunctions from "./modules/functions.js";
// import { toggleNav } from "./modules/burger.js";

commonFunctions.isWebp();

document.addEventListener("DOMContentLoaded", () => {
  function toggleNav(burgerSelector, navSelector) {
     const burger = document.querySelector(burgerSelector);
    const nav = document.querySelector(navSelector);
    burger.classList.toggle("active");
    document.querySelector(nav).classList.toggle("open");
  }
  toggleNav(".burger", ".burger__nav-list");

  console.log(document.querySelector(".burger"));
});
