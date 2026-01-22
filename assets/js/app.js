import * as commonFunctions from "./modules/functions.js";
// import { toggleNav } from "./modules/burger.js";

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

  // Popup modals
  const modalBtns = document.querySelectorAll(".portfolio__btn");
  const modals = document.querySelectorAll(".modal");
  const modalCloses = document.querySelectorAll(".modal__close");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById(btn.dataset.modal);
      modal.style.display = "flex";
    });
  });

  modalCloses.forEach((close) => {
    close.addEventListener("click", () => {
      close.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

  // year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("dataFooter").textContent = currentYear;
});
