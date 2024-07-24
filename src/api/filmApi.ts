
import { apiRequest } from './api';

export const getMoviesByCount = async (count = 50) => {
    return apiRequest(`/movie?count=${count}`);
};
export const getMoviesByGenry = async (genre="comedy") => {
    return apiRequest(`/movie?genre=${genre}`);
};

export const getTop10 = async () => {
    return apiRequest('/movie/top10');
};

export const getGenres = async () => {
    return apiRequest('/movie/genres');
};

export const getMovieById = async (id = 1) => {
    return apiRequest(`/movie/${id}`);
};

export const getRandomMovie = async () => {
    return apiRequest('/movie/random');
};
