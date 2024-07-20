
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
