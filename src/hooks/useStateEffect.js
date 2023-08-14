import { useEffect, useState, useDebugValue } from "react";
import makeRequest from "../utils/makeRequest";

export default function useStateEffect(type, endpoint, method, body = null) {
    const initialState = type === 'array' ? [] : type === 'object' ? {} : null;
    const [state, setState] = useState(initialState);

    const fetchData = async () => {
        const response = await makeRequest(endpoint, method, body);
        setState(response.data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    useDebugValue(state ?? 'loading...');

    return state;
}
