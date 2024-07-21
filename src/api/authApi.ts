import { apiRequest } from "./api";

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
    return apiRequest("/favorites");
  } catch {
    console.error("ошибка получения любимых картин");
  }
}

export async function setFavoritesFilms(id:number) {
  const body = new URLSearchParams({
    id:String(id)
  });
  try {
    const profile = await getProfile();
    if(!profile) return
    return apiRequest(
      "/favorites",
      "POST",
      { "Content-Type": "application/x-www-form-urlencoded" },
      body
    );
  } catch {}
}


export async function deleteFavoritesFilms(id:number) {
  const body = new URLSearchParams({
    id:String(id)
  });
  try {
    const profile = await getProfile();
    if(!profile) return
    return apiRequest(
      "/favorites",
      "DELETE",
      { "Content-Type": "application/x-www-form-urlencoded" },
      body
    );
  } catch {}
}
