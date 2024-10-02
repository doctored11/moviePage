import { Movie } from "components/hero/Hero";
import { apiRequest } from "./api";
import { getLocalFilms } from "./filmApi";

interface User {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export const regUser = async ({
  email,
  password,
  name,
  surname,
}: User): Promise<any> => {
  const body = new URLSearchParams({
    email: email,
    password: password,
    name: name || "",
    surname: surname || "",
  });

  return apiRequest(
    "/user",
    "POST",
    { "Content-Type": "application/x-www-form-urlencoded" },
    body
  );
};

export async function getLocalFavoriteFilms() {
  const films = localStorage.getItem("Favorite");

  if (films != "[]" && films) {
    return JSON.parse(films);
  }
  return [];
}
export function deleteLocalFavoriteFilms() {
  localStorage.setItem("Favorite", JSON.stringify([]));
}

async function addFavoriteFilms(newFilms: Array<Movie>) {
  const existingFilms = await getLocalFavoriteFilms();
  const filmMap = new Map(existingFilms.map((film: Movie) => [film.id, film]));

  newFilms.forEach((film) => {
    filmMap.set(film.id, film);
  });

  const updatedFilms = Array.from(filmMap.values());
  localStorage.setItem("Favorite", JSON.stringify(updatedFilms));
}

async function deleteFavoriteLocalFilm(id: number) {
  const lf: Movie[] = await getLocalFavoriteFilms();

  const newFilmArr = lf.filter((film) => film.id != id);

  localStorage.setItem("Favorite", JSON.stringify(newFilmArr));
}

export const getProfile = async (): Promise<any> => {
  return apiRequest("/profile");
};

export const loginUser = async ({ email, password }: User): Promise<any> => {
  const body = new URLSearchParams({
    email,
    password,
  });
  await deleteLocalFavoriteFilms();
  

  return apiRequest(
    "/auth/login",
    "POST",
    { "Content-Type": "application/x-www-form-urlencoded" },
    body
  );
};

export const logoutUser = async (): Promise<any> => {
  deleteLocalFavoriteFilms();
  return apiRequest("/auth/logout", "GET");
};

//

export const registerUser = async ({
  email,
  password,
  name,
  surname,
}: User) => {
  deleteLocalFavoriteFilms();

  try {
    await regUser({ email, password, name, surname });
    // await loginUser({ email, password });
    // const profile = await getProfile();
  } catch (error) {
    console.error(error);
    throw error
  }
};

export async function getFavoritesFilms() {
  try {
    const films = await apiRequest("/favorites");

    if (films && films.length > 0) {
      localStorage.setItem("Favorite", JSON.stringify(films));
    }

    return films || [];
  } catch {
    console.error("ошибка получения любимых картин");
    return [];
  }
}

export async function setFavoritesFilms(id: number) {
  const profile = await getProfile();
  if (!profile) return;

  const lf: Movie[] = getLocalFilms();

  const thisFilm = lf.find((film) => film.id == id);
  if (thisFilm) addFavoriteFilms([thisFilm]);

  const body = new URLSearchParams({
    id: String(id),
  });

  try {
    const profile = await getProfile();
    if (!profile) return;
    return apiRequest(
      "/favorites",
      "POST",
      { "Content-Type": "application/x-www-form-urlencoded" },
      body
    );
  } catch {
    console.error("ошибка добваления фильма в избранное");
  }
}

export async function deleteFavoritesFilms(id: number) {
  deleteFavoriteLocalFilm(id);

  try {
    const profile = await getProfile();
    if (!profile) return;
    return apiRequest(`/favorites/${id}`, "DELETE", {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  } catch {}
}
