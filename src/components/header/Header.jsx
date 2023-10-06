import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

import { Link } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Header() {
    const { profile } = useContext(ProfileContext);

    return (
        <header className="flex justify-end py-8 bg-white">
            <div className="flex gap-4 mr-16">
                <div className="flex flex-col items-end">
                    <div className="font-bold">
                        {profile.first_name} {profile.last_name}
                    </div>
                    <div className="text-grey">Admin</div>
                </div>
                <Link to={"profile-update"}>
                    <img
                        src={
                            profile.profile_pic
                                ? BASE_URL + profile.profile_pic
                                : defaultUser
                        }
                        className="h-10 w-10 rounded-full"
                    />
                </Link>
            </div>
        </header>
    );
}
