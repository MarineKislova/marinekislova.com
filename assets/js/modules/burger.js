export function toggleNav(burgerSelector, navSelector) {
    burgerSelector.classList.toggle("active");
    document.querySelector(navSelector).classList.toggle("open");
}