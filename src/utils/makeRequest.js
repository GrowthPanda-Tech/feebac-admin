const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_TOKEN = localStorage.getItem("authToken");

//TODO: implement timeout
export default async function makeRequest(route, method = "GET", body = null) {
  const request = {
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  if (body)
    request.body = body instanceof FormData ? body : JSON.stringify(body);

  try {
    const response = await fetch(`${BASE_URL}/${route}`, request);
    const statusCode = response.status;

    if (!response.ok || statusCode >= 500 || statusCode === 204)
      throw new Error(statusCode);

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
