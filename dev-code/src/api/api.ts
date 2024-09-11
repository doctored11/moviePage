const BASE_URL = "https://cinemaguide.skillbox.cc"
if (!BASE_URL) {
  console.error("адрес сервера не найден");
}

export interface RequestType {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  credentials?: RequestCredentials;
}

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  headers: HeadersInit = {},
  body: BodyInit | null = null
): Promise<any> {
  const options: RequestType = {
    method,
    headers: {
      accept: "application/json",
      ...headers,
    },
    credentials: "include",
  };

  if (body) {
    options.body = body;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return handleResponse(response);
}

export async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Ошибка сети");
  }

  const res = await response.json();

  return res;
}
