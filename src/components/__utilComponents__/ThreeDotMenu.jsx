import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import MenuButton from "@helperComps/MenuButton";

class MenuItem {
  constructor(name, handler) {
    // this.key = crypto.randomUUID();
    this.key = uuidv4();
    this.name = name;
    this.handler = handler;
  }
}

export default function ThreeDotMenu({
  handleStatus,
  handleEdit,
  handleDelete,
  loading,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = useMemo(
    () => [
      new MenuItem("Toggle Status", handleStatus),
      new MenuItem("Edit", handleEdit),
      new MenuItem("Delete", handleDelete),
    ],
    [handleStatus, handleEdit, handleDelete],
  );

  return (
    <div className="relative z-10">
      <i
        className="fa-solid fa-ellipsis-vertical absolute right-0 top-0 cursor-pointer p-4 text-2xl text-white"
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className="absolute right-0 top-12 flex flex-col rounded-lg border bg-white shadow-md">
          {menuItems.map(({ key, name, handler }) =>
            handler ? (
              <MenuButton
                key={key}
                name={name}
                handler={handler}
                loading={loading}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
