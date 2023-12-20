import { createContext } from "react";
import useFetch from "@/hooks/useFetch";

export const ProfileContext = createContext(null);

export default function ProfileContextProvider({ children }) {
  const { loading, fetchedData, setFetchedData, error } = useFetch("profile/");

  return (
    <ProfileContext.Provider
      value={{ loading, fetchedData, setFetchedData, error }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
