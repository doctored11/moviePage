import { Movie } from "../components/hero/Hero";
import { apiRequest } from "./api";

function getLocalFilms() {
  const films = localStorage.getItem("localFilms");
  return films ? JSON.parse(films) : [];
}

function updateLocalFilms(newFilms: Array<Movie>) {
  const existingFilms = getLocalFilms();
  const filmMap = new Map(existingFilms.map((film: Movie) => [film.id, film]));

  newFilms.forEach((film) => {
    filmMap.set(film.id, film);
  });

  const updatedFilms = Array.from(filmMap.values());
  localStorage.setItem("localFilms", JSON.stringify(updatedFilms));
}
//

export const getMoviesByCount = async (count = 50) => {
  const movies = await apiRequest(`/movie?count=${count}`);
  updateLocalFilms(movies);
  return movies;
};
export const getMoviesByGenry = async (genre = "comedy") => {
  const movies = await apiRequest(`/movie?genre=${genre}`);
  updateLocalFilms(movies);
  return movies;
};

export const getTop10 = async () => {
    const movies = await apiRequest('/movie/top10');
    updateLocalFilms(movies);
    return movies;
};

export const getGenres = async () => {
  return apiRequest("/movie/genres");
};

export const getMovieById = async (id = 1) => {
    const movie = await apiRequest(`/movie/${id}`);
    updateLocalFilms([movie]);
    return movie;
};

export const getRandomMovie = async () => {
    const movie = await apiRequest('/movie/random');
    updateLocalFilms([movie]);
    return movie;
};
