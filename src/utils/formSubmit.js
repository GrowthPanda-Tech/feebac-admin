export default async function formSubmit(event, route, method, body) {
  event.preventDefault();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const req = {
      method,
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
      body,
      redirect: "follow",
    };

    const res = await fetch(`${baseUrl}/${route}`, req);
    if (res.status >= 500) {
      throw new Error(res.status);
    }
    const json = await res.json();

    return json;
  } catch (error) {
    throw error;
  }
}
