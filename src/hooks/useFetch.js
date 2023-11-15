import { useState, useEffect } from "react";

import makeRequest from "../utils/makeRequest";

export default function useFetch(route) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await makeRequest(route);

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setResponse(response);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, [route]);

    return { loading, response, setResponse, error };
}
