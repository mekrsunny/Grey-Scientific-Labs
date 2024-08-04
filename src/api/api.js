import axios from "axios";

const API_URL = "http://www.omdbapi.com/";

export const fetchMovies = async (title, page = 1) => {
  const response = await axios.get(API_URL, {
    params: {
      s: title,
      page: page,
      apiKey:"f21ee770",
    },
  });
  return response.data;
};
