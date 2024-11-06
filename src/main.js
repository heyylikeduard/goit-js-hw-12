import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay.js";
import { createImageMarkup } from "./js/render-functions.js"


const form = document.getElementById("search-form");
const galleryContainer = document.querySelector(".gallery");
const loader = document.getElementById("loader");

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();
  if (query === "") {
    iziToast.warning({ title: "Warning", message: "Please enter a search term." });
    return;
  }

  loader.style.display = "block"; // Показуємо індикатор завантаження

  try {
    const images = await fetchImages(query);

    galleryContainer.innerHTML = '';

    if (images.length === 0) {
      iziToast.info({
        title: "Info",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    galleryContainer.innerHTML = createImageMarkup(images);
    lightbox.refresh();
  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to fetch images. Please try again later." });
  } finally {
    loader.style.display = "none"; // Приховуємо індикатор завантаження після завершення запиту
  }
});