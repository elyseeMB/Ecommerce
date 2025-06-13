export async function apiFetch<T>(
  path: string,
  {
    method,
    json,
  }: {
    method?: "POST" | "GET" | "DELETE" | "PUT";
    json?: Record<string, any> | undefined;
  },
) {
  const endpoint = "http://localhost:3333";
  method ??= json ? "POST" : "GET";
  const body = json ? JSON.stringify(json) : undefined;
  const response = await fetch(endpoint + path, {
    credentials: "include",
    method,
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return (await response.json()) as Promise<T>;
  }
  throw new Error("Error Serveur  apiFetch");
}
