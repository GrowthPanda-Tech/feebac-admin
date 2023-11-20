import { createContext } from "react";

import useFetch from "../hooks/useFetch";

export const FilterContext = createContext(null);

export default function FilterContextProvider({ children }) {
  const { loading, fetchedData, setFetchedData, error } = useFetch(
    "config/get-profile-key-value"
  );

  return (
    <FilterContext.Provider value={{ fetchedData, setFetchedData }}>
      {children}
    </FilterContext.Provider>
  );
}
