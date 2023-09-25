import { Link } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.png";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

export default function Header() {
    const [userInfo, setUserInfo] = useState();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const getAdminInfo = async () => {
        try {
            const response = await makeRequest(`profile/`, "GET");
            if (response.isSuccess) {
                setUserInfo(response.userInfo);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAdminInfo();
    }, []);

    return (
        <header className="flex justify-end py-8 bg-white">
            {userInfo && (
                <div className="flex gap-4 mr-16">
                    <div className="flex flex-col items-end">
                        <div className="font-bold">
                            {userInfo.first_name} {userInfo.last_name}
                        </div>
                        {/* TODO: Dynamic user role */}
                        <div className="text-grey">Admin</div>
                    </div>
                    <Link to={"profile-update"}>
                        <img
                            src={
                                userInfo.profile_pic
                                    ? baseUrl + userInfo.profile_pic
                                    : defaultUser
                            }
                            className="h-10 w-10 rounded-full"
                            alt={defaultUser}
                        />
                    </Link>
                </div>
            )}
        </header>
    );
}
