import { useState, useEffect } from "react";
import Filter from "./Filter";
import makeRequest from "../../../utils/makeRequest";

export default function Profiles() {
    //TODO: Can I cache this?
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
            {profiles.map((profile) => (
                <div className="mb-8" key={profile.id}>
                    <h1 className="text-xl mb-4 font-medium">
                        {profile.dataType} Filters
                    </h1>

                    <div className="grid grid-cols-3 gap-8">
                        {profile.key.map((filter) => (
                            <Filter
                                key={filter.id}
                                dataTypeId={profile.id}
                                filter={filter}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
