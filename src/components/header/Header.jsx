import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

import { Link } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.png";

export default function Header() {
  const { profile } = useContext(ProfileContext);
  const profilePic = profile.profile_pic ? profile.profile_pic : defaultUser;

  return (
    <header className="flex justify-end py-4 bg-white">
      <div className="flex gap-4 mr-16">
        <div className="flex flex-col items-end">
          <div className="font-bold">
            {profile.first_name} {profile.last_name}
          </div>
          <div className="text-grey">Admin</div>
        </div>
        <Link to={"profile-update"}>
          <img src={profilePic} className="h-10 w-10 rounded-full" />
        </Link>
      </div>
    </header>
  );
}
