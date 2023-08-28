export default async function makeRequest(route, method, body = null) {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const req = {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
        },
    };

    if (body != null) {
        req.body = JSON.stringify(body);
    }

    const res = await fetch(`${baseUrl}/${route}`, req);
    const json = await res.json();

    return json;
}
