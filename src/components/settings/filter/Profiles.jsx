import { useState, useEffect } from "react";
import makeRequest from "../../../utils/makeRequest";
import ProfileSubSection from "./ProfileSubSection";

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);

    const getProfiles = async () => {
        const response = await makeRequest(
            "config/get-profile-key-value",
            "GET"
        );
        response.isSuccess
            ? setProfiles(response.data)
            : alert(response.message);
    };

    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <>
            {profiles.map((profile, key) => (
                <ProfileSubSection
                    key={key}
                    type={profile.dataType}
                    filters={profile.key}
                />
            ))}
        </>
    );
}
