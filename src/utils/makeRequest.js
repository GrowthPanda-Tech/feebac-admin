const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function makeRequest(
    route,
    method = "GET",
    body = null,
    timeout = 10000
) {
    const request = {
        method,
        headers: {
            authToken: localStorage.getItem("authToken"),
        },
    };

    if (body != null) {
        request.body = JSON.stringify(body);
    }

    try {
        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => {
            controller.abort();
        }, timeout);

        const response = await fetch(`${BASE_URL}/${route}`, {
            ...request,
            signal,
        });

        clearTimeout();

        if (response.status >= 500) {
            throw new Error(response.status);
        }

        const json = await response.json();

        return json;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Timeout");
        } else {
            throw error;
        }
    }
}
