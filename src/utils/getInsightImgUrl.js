const BASE_URL = import.meta.env.VITE_BASE_URL;
const GET_IMG_URL = `${BASE_URL}/insights/upload-insights-images`;
const AUTH_TOKEN = localStorage.getItem("authToken");

export default async function getInsightImgUrl(body) {
    const request = {
        body,
        method: "POST",
        headers: {
            authToken: AUTH_TOKEN,
        },
    };

    try {
        const response = await fetch(GET_IMG_URL, request);

        if (response.status >= 500) {
            throw new Error(response.status);
        }

        const json = await response.json();

        if (!json.isSuccess) {
            throw new Error(json.message);
        }

        return json.data;
    } catch (error) {
        throw error;
    }
}
