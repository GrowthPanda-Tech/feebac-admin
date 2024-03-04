import { useContext } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { ProfileContext } from "@/contexts/ProfileContext";

import defaultUser from "@/assets/defaultUser.png";

export default function Header() {
  const { fetchedData } = useContext(ProfileContext);

  const profilePic = fetchedData?.userInfo.profile_pic
    ? fetchedData?.userInfo.profile_pic
    : defaultUser;

  return (
    <header className="flex justify-end bg-white py-4">
      <div className="mr-16 flex gap-4">
        <div className="flex flex-col items-end">
          <div className="font-bold">
            {fetchedData?.userInfo.first_name} {fetchedData?.userInfo.last_name}
          </div>
          <div className="text-grey">Admin</div>
        </div>
        <HeaderMenu profilePic={profilePic} />
      </div>
    </header>
  );
}
