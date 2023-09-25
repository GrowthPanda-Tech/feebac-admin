export default async function makeRequest(route, method, body = null) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const request = {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
        },
    };

    if (body != null) request.body = JSON.stringify(body);

    const response = await fetch(`${baseUrl}/${route}`, request);
    const json = await response.json();

    return json;
}
