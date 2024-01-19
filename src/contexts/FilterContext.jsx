import { createContext, useContext } from "react";

import useFetch from "../hooks/useFetch";

export const FilterContext = createContext(null);

export default function FilterContextProvider({ children }) {
  const { loading, fetchedData, setFetchedData, error } = useFetch(
    "config/get-profile-key-value",
  );

  return (
    <FilterContext.Provider
      value={{ loading, fetchedData, setFetchedData, error }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error(
      "useFilterContext must be used within FilterContextProvider",
    );
  }

  return context;
}
