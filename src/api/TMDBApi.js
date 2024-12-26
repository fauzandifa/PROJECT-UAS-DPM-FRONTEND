import axios from "axios";

const API_KEY = "ef23803940556cb0994788809429deb0";
const BASE_URL = "https://api.themoviedb.org/3";

// Axios instance
const TMDBApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch movies from the API
export const fetchMovies = async (endpoint) => {
  try {
    const response = await TMDBApi.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.error(
      `Error fetching movies from ${endpoint}:`,
      error.response?.data || error.message
    );
    return [];
  }
};

// Search movies based on the query
export const searchMovies = async (query) => {
  try {
    const response = await TMDBApi.get("/search/movie", {
      params: {
        query: query, // The search query
        page: 1, // The page of results (can be adjusted if you want pagination)
        include_adult: false, // Optional: whether to include adult content
      },
    });
    return response.data.results; // Returning the list of results
  } catch (error) {
    console.error(
      "Error searching movies:",
      error.response?.data || error.message
    );
    return [];
  }
};
