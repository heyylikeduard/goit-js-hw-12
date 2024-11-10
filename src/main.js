import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api.js";
import { createImageMarkup } from "./js/render-functions.js"


const form = document.getElementById("search-form");
const galleryContainer = document.querySelector(".gallery");
const loader = document.getElementById("loader");
const loadMoreButton = document.getElementById("load-more");

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0; 
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function loadImages() {
  loader.style.display = "block"; 

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0 && page === 1) {
      iziToast.info({
        title: "Info",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      loadMoreButton.style.display = "none";
      return;
    }

    galleryContainer.insertAdjacentHTML('beforeend', createImageMarkup(data.hits));
    lightbox.refresh();

    if (galleryContainer.children.length >= totalHits) {
      loadMoreButton.style.display = "none";
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreButton.style.display = "block";
    }

    scrollPage();

    page += 1; 
  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to fetch images. Please try again later." });
  } finally {
    loader.style.display = "none";
  }
}

function scrollPage() {
  const photoCard = galleryContainer.querySelector('.photo-card');
  if (!photoCard) return; 
  const cardHeight = photoCard.getBoundingClientRect().height; 
  window.scrollBy({
    top: cardHeight * 2, 
    behavior: 'smooth', 
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  query = event.target.elements.query.value.trim();
  if (query === "") {
    iziToast.warning({ title: "Warning", message: "Please enter a search term." });
    return;
  }

  galleryContainer.innerHTML = ''; 
  page = 1;
  totalHits = 0;
  loadMoreButton.style.display = "none";

  loadImages();  
});

loadMoreButton.addEventListener("click", loadImages);