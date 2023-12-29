import { useState } from "react";
import MenuButton from "@helperComps/MenuButton";

export default function ThreeDotMenu({ handleStatus, handleEdit }) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleMenu = () => setIsShowMenu(!isShowMenu);

  return (
    <div className="relative z-10">
      <i
        className="fa-solid fa-ellipsis-vertical absolute right-0 top-0 cursor-pointer p-4 text-2xl text-white"
        onClick={toggleMenu}
      />
      {isShowMenu && (
        <div className="absolute right-0 top-12 flex flex-col rounded-lg border bg-white shadow-md">
          <MenuButton name={"Toggle Status"} handler={handleStatus} />
          <MenuButton name={"Edit"} handler={handleEdit} />
        </div>
      )}
    </div>
  );
}
