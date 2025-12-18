import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./doPublish`; // папка сборки для публикации
const srcFolder = `./assets`; // папка с исходными файлами

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    html: `${buildFolder}/`,
    ru: `${buildFolder}/ru/`,
    en: `${buildFolder}/en/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/scss/style.scss`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    html: `${srcFolder}/*.html`, //.pug
    ru: `${srcFolder}/ru/*.html`, //.pug
    en: `${srcFolder}/en/*.html`, //.pug
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    images: `${srcFolder}img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    html: `${srcFolder}/**/*.html`, //.pug
    ru: `${srcFolder}/**/*.html`, //.pug
    en: `${srcFolder}/**/*.html`, //.pug
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  swiperCss: "node_modules/swiper/swiper-bundle.min.css",
  swiperJs: "node_modules/swiper/swiper-bundle.min.js",
  tailwindConfig: "./tailwind.config.js",
  ftp: `test`, // ваш FTP-адрес, заполняем в самый последний момент при наличии FTP-сервера
};
