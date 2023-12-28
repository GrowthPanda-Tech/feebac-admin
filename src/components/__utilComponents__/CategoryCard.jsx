import { useState } from "react";

export default function CategoryCard({ handleStatus, handleEdit }) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div className="relative z-10">
      <i
        className="fa-solid fa-ellipsis-vertical absolute right-0 top-0 cursor-pointer p-4 text-2xl"
        style={{ color: "#ffffff" }}
        onClick={() => setIsShowMenu(!isShowMenu)}
      />
      <div className="absolute right-0 top-11 flex flex-col justify-end">
        {isShowMenu ? (
          <div className="z-10 flex flex-col gap-3 rounded-lg border bg-white p-3 shadow-md">
            <button onClick={handleStatus}>Toggle Status</button>
            <button onClick={handleEdit}> Edit </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
