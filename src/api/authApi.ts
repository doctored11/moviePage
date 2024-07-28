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

export function getLocalFavoriteFilms() {
  const films = localStorage.getItem("Favorite");
  return films ? JSON.parse(films) : [];
}

function addFavoriteFilms(newFilms: Array<Movie>) {
  console.log("addF", newFilms);
  const existingFilms = getLocalFavoriteFilms();
  const filmMap = new Map(existingFilms.map((film: Movie) => [film.id, film]));

  newFilms.forEach((film) => {
    filmMap.set(film.id, film);
  });

  const updatedFilms = Array.from(filmMap.values());
  localStorage.setItem("Favorite", JSON.stringify(updatedFilms));
}

export const getProfile = async (): Promise<any> => {
  return apiRequest("/profile");
};

export const loginUser = async ({ email, password }: User): Promise<any> => {
  const body = new URLSearchParams({
    email,
    password,
  });

  return apiRequest(
    "/auth/login",
    "POST",
    { "Content-Type": "application/x-www-form-urlencoded" },
    body
  );
};

export const logoutUser = async (): Promise<any> => {
  return apiRequest("/auth/logout", "GET");
};

//

export const registerUser = async ({
  email,
  password,
  name,
  surname,
}: User) => {
  try {
    await regUser({ email, password, name, surname });
    await loginUser({ email, password });
    const profile = await getProfile();
    console.log(profile);
  } catch (error) {
    console.error(error);
  }
};

export async function getFavoritesFilms() {
  try {
    const films = await apiRequest("/favorites");
    addFavoriteFilms(films);
    return films;
  } catch {
    console.error("ошибка получения любимых картин");
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
  } catch {}
}

export async function deleteFavoritesFilms(id: number) {
  console.log("1", id);

  const lf: Movie[] = getLocalFavoriteFilms();
  console.log("2");
  console.log(lf);
  const newFilmArr = lf.filter((film) => film.id != id);
  console.log(newFilmArr);
  localStorage.setItem("Favorite", JSON.stringify(newFilmArr));
  console.log("3");

  try {
    const profile = await getProfile();
    if (!profile) return;
    return apiRequest(`/favorites/${id}`, "DELETE", {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  } catch {}
  console.log("4");
}
