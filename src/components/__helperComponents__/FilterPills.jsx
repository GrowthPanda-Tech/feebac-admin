import { useState } from "react";

export default function FilterPills({ name, setTarget }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);

    setTarget((prev) => {
      const prevClone = structuredClone(prev);

      if (!Object.keys(prev).includes(name)) {
        prevClone[name] = [];
        return prevClone;
      }

      delete prevClone[name];
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
