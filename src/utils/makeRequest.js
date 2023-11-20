const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_TOKEN = localStorage.getItem("authToken");

export default async function makeRequest(route, method = "GET", body = null) {
  const request = {
    method,
    headers: {
      authToken: AUTH_TOKEN,
      Accept: "application/json",
      // Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  if (body) {
    request.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${route}`, request);
    const statusCode = response.status;

    //TODO: error based on respnse.ok
    if (statusCode >= 500 || statusCode === 204) {
      throw new Error(statusCode);
    }

    return await response.json();
  } catch (error) {
    //TODO: throw different error based on status code
    throw error;
  }
}
