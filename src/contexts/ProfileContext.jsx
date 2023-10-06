import { createContext, useState, useEffect } from "react";
import makeRequest from "../utils/makeRequest";

export const ProfileContext = createContext(null);

export default function ProfileContextProvider({ children }) {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        let ignore = false;

        async function getCategories() {
            try {
                const response = await makeRequest("profile/");

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setProfile(response.userInfo);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getCategories();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}
