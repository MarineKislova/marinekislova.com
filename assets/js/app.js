import * as commonFunctions from "./modules/functions.js";
import { renderPortfolioCards } from "./modules/portfolioCards.js";

commonFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function () {
  // --- Burger menu ---
  const burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      this.classList.toggle("active");
      document.querySelector(".burger__nav").classList.toggle("open");
    });
  }

  // --- Slider portfolio on index.html ---
  let slideIndex = 1;
  showSlides(slideIndex);

  // 1. Контролы "Вперед/Назад"
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (prevBtn) prevBtn.addEventListener("click", () => plusSlides(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => plusSlides(1));

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // 2. Клик по точкам (dots)
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlides((slideIndex = index + 1));
    });
  });

  // 3. Клик по картинкам (НОВОЕ)
  const slideImages = document.querySelectorAll(".slideImg");
  slideImages.forEach((img) => {
    img.style.cursor = "pointer"; // Чтобы курсор менялся на "руку"
    img.addEventListener("click", () => {
      plusSlides(1); // При клике идем к следующему слайду
    });
  });

  // Главная функция отображения
  function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dotsArr = document.getElementsByClassName("dot");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    // Скрываем все слайды
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Убираем класс active у точек
    for (let i = 0; i < dotsArr.length; i++) {
      dotsArr[i].className = dotsArr[i].className.replace(" active", "");
    }

    // Показываем нужный слайд и точку
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
    }
    if (dotsArr[slideIndex - 1]) {
      dotsArr[slideIndex - 1].className += " active";
    }
  }

  // --- Функция создания кнопок фильтров ---
  function createFilterBtn(filter) {
    const container = document.querySelector(".portfolio__filters");
    const elementEN = document.querySelector('[data-lang="EN"]');
    const elementUA = document.querySelector('[data-lang="UA"]');
    const elementRU = document.querySelector('[data-lang="RU"]');

    if (!container) return;

    const btn = document.createElement("button");
    btn.classList.add("filter-btn");
    btn.dataset.filter = filter;

    // Красивое отображение текста кнопки
    if (filter === "all" && elementEN) {
      btn.textContent = "ALL"; // Или "Все"
    } else if (filter === "all" && elementUA) {
      btn.textContent = "УСІ";
    } else if (filter === "all" && elementRU) {
      btn.textContent = "ВСЕ";
    } else {
      btn.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
    }

    btn.style.display = filter === "" ? "none" : "block";
    container.appendChild(btn);
  }

  // --- Функция инициализации кликов по фильтрам ---
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    if (filterBtns.length > 0) filterBtns[0].classList.add("active");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".portfolio__item").forEach((item) => {
          const isAll = filter === "all";
          const matchesCategory = item.dataset.category === filter;
          const isEmpty = !item.dataset.category; // Защита от пустых данных

          item.style.display = isEmpty ? "none" : isAll || matchesCategory ? "flex" : "none";
        });
      });
    });
  }

  // --- Загрузка данных и отрисовка ---
  fetch("/js/data/portfolioData.json")
    .then((res) => {
      if (!res.ok) throw new Error("Portfolio JSON not loaded");
      return res.json();
    })
    .then((portfolioData) => {
      // 1. Собираем уникальные фильтры (только если они не пустые)
      const rawFilters = portfolioData.map((item) => item.filter).filter((f) => f && f.trim() !== "");

      const uniqueFilters = ["all", ...new Set(rawFilters)];

      // 2. Генерируем кнопки фильтров
      uniqueFilters.forEach(createFilterBtn);

      // 3. Отрисовываем сами карточки проектов
      renderPortfolioCards(".portfolio__items", portfolioData, "portfolioEN", "portfolioUA", "portfolioRU");

      // 4. Навешиваем обработчики событий (теперь элементы точно в DOM)
      initPortfolioFilters();
    })
    .catch((err) => console.error("Portfolio load error:", err));

  //форма отправки
  document.getElementById("tg-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const btn = document.getElementById("submit-btn");
    const status = document.getElementById("status-message");

    const currentLang = form.dataset.siteLang || "EN";

    const translations = {
      UA: { sending: "Відправка...", success: "Успішно!", error: "Помилка." },
      EN: { sending: "Sending...", success: "Success!", error: "Error." },
      RU: { sending: "Отправка...", success: "Успешно!", error: "Ошибка." },
    };
    const msg = translations[currentLang];

    const formData = new FormData(form);

    // Проверка ловушки (если поле заполнено — это бот)
    if (formData.get("honey")) {
      console.warn("Spam detected");
      return;
    }

    btn.disabled = true;
    status.textContent = msg.sending;

    try {
      const response = await fetch("send.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        status.textContent = "Успешно отправлено!";
        form.reset();
      } else {
        status.textContent = "Ошибка при отправке.";
      }
    } catch (error) {
      status.textContent = "Ошибка сети.";
    } finally {
      btn.disabled = false;
    }
  });

  // --- Footer Year ---
  const footerYear = document.getElementById("dataFooter");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
