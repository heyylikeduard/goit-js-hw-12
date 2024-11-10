import axios from 'axios';

const API_KEY = "46909038-6f1101192bb2e76c1441c4637";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 150;  // тест кількості

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: PER_PAGE,
    page: page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; 
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}