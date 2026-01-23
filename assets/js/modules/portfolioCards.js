function renderPortfolioCards(itemsSelector, projects, EN, UA, RU) {
  const portfolioCardsContainer = document.querySelector(itemsSelector);
  const modal = document.getElementById("portfolio-modal");
  const closeModal = document.querySelector(".modal__close");

  // Элементы внутри модалки
  const modalTitle = document.getElementById("modal-title");
  const modalImg = document.getElementById("modal-image");
  const modalDesc = document.getElementById("modal-description");
  const modalLinks = document.getElementById("modal-links");

  const english = document.getElementById(EN);
  const ukrainian = document.getElementById(UA);
  const russian = document.getElementById(RU);

  if (!portfolioCardsContainer) return;

  projects.forEach((item) => {
    //card
    const cardItem = document.createElement("div");
    cardItem.classList.add("portfolio__item");
    cardItem.setAttribute("data-category", item.filter);

    //hide card if title is empty
    if (item.title === "") {
      cardItem.style.display = "none";
    }
    //card title
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("portfolio__item-title");
    cardTitle.textContent = item.title;
    cardItem.appendChild(cardTitle);
    //card image
    const cardImage = document.createElement("img");
    cardImage.classList.add("portfolio__item-image");
    cardImage.src = item.image;
    cardImage.alt = item.title;
    cardItem.appendChild(cardImage);
    //card more details button
    const cardBtn = document.createElement("button");
    cardBtn.classList.add("portfolio__btn");
    cardBtn.setAttribute("data-id", item.id);
    if (english) cardBtn.textContent = "More details";
    else if (ukrainian) cardBtn.textContent = "Детальніше";
    else if (russian) cardBtn.textContent = "Подробнее";
    cardItem.appendChild(cardBtn);

    //modal
    cardBtn.addEventListener("click", () => {
      modalTitle.textContent = item.title;

      modalImg.innerHTML = `<img src="${item.image}" alt="${item.title}">`;

      if (english) modalDesc.innerHTML = item.description || "No description available";
      else if (ukrainian) modalDesc.innerHTML = item.descriptionUA || "Опис відсутній";
      else if (russian) modalDesc.innerHTML = item.descriptionRU || "Описание отсутствует";

      modalLinks.innerHTML = `<a href="${item.demo}" target="_blank">Demo</a> <a href="${item.code}" target="_blank">Code</a>`;

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    portfolioCardsContainer.appendChild(cardItem);
  });

  closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}

export { renderPortfolioCards };
