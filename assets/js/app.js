import * as commonFunctions from "./modules/functions.js";
import { portfolio } from "./modules/portfolioData.js";
import { renderPortfolioCards } from "./modules/portfolioCards.js";

commonFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function () {
  // burger menu
  document.querySelector(".burger").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".burger__nav").classList.toggle("open");
  });

  // filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio__item");

  function filterMap(items) {
    let one = [];
    for (const filter in items) {
      one = items[filter].filter;
      console.log(one);
      
      console.log(items[filter].filter);
    }
    console.log(one);
  }

  filterMap(portfolio);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      items.forEach((item) => {
        item.style.display = filter === "all" || item.dataset.category === filter ? "block" : "none";
      });
    });
  });

  //portfolio cards
  renderPortfolioCards(".portfolio__items", portfolio, "portfolioEN", "portfolioUA", "portfolioRU");

  // year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("dataFooter").textContent = currentYear;
});
