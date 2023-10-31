import { createContext } from "react";

import useFetch from "../hooks/useFetch";

export const FilterContext = createContext(null);

export default function FilterContextProvider({ children }) {
    const { loading, response, setResponse, error } = useFetch(
        "config/get-profile-key-value"
    );

    return (
        <FilterContext.Provider value={{ response, setResponse }}>
            {children}
        </FilterContext.Provider>
    );
}
