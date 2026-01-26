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

  let one = [];
  for (const filter in portfolio) {
    one.push(portfolio[filter].filter);
  }
  console.log(one);
  let filters = [...new Set(one)];
  console.log(filters);

  //filters btn
  function createFilterBtn(filter) {
    const container = document.querySelector(".portfolio__filters");
    const btn = document.createElement("button");
    btn.classList.add("filter-btn");
    btn.dataset.filter = filter;
    btn.textContent = filter;
    if (btn.dataset.filter === "") {
      btn.style.display = "none";
    } else {
      btn.style.display = "block";
    }
    container.appendChild(btn);
  }

  if (document.querySelector(".portfolio__filters")) {
    filters.forEach(createFilterBtn);
  }

  // filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio__item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const items = document.querySelectorAll(".portfolio__item");

      items.forEach((item) => {
        item.style.display = filter === "all" || item.dataset.category === filter ? "flex" : "none";
        if (item.dataset.category === "") item.style.display = "none";
      });

      
    });
  });

  //portfolio cards
  renderPortfolioCards(".portfolio__items", portfolio, "portfolioEN", "portfolioUA", "portfolioRU");

  // year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("dataFooter").textContent = currentYear;
});
