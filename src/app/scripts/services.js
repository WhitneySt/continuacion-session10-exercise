import axios from "axios";

const URL_API = "https://api.themoviedb.org/3/";
const API_KEY = "33e49b5813eb54a7bad9378df019b842";

export const getAllMovies = async (page = 1) => {
  try {
    const response = await axios(
      `${URL_API}movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const searchMovie = async (text = "", page = 1) => {
  try {
    const response = await axios(
      `${URL_API}search/movie?api_key=${API_KEY}&language=es-ES&query=${text}&page=${page}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMoreRated = async (page=1) => {
  try {
    const response = await axios(
      `${URL_API}movie/top_rated?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecents = async (page=1) => {
  try {
    const response = await axios(
      `${URL_API}movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getMovieById = async (idMovie) => {
  try {
    const response = await axios(
      `${URL_API}movie/${idMovie}?api_key=${API_KEY}&language=es-ES`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}