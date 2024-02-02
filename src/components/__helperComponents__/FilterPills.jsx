import { useState } from "react";

const LOCATION_KEYS = ["country", "state", "city"];

export default function FilterPills({ name, setTarget }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);

    setTarget((prev) => {
      if (!Object.keys(prev).includes(name) || !prev[name]) {
        return { ...prev, [name]: [] };
      }

      const prevClone = structuredClone(prev);

      if (!LOCATION_KEYS.includes(name)) {
        delete prevClone[name];
      } else {
        prevClone[name] = null;
      }

      return prevClone;
    });
  };

  return (
    <div
      className={`p-2 px-4 capitalize ${
        clicked ? "bg-secondary text-white" : "bg-white"
      } w-fit cursor-pointer rounded-xl font-medium`}
      onClick={handleClick}
    >
      {name}
    </div>
  );
}
