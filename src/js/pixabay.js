const API_KEY = "46909038-6f1101192bb2e76c1441c4637"; 
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.hits; 
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
