import { useState } from "react";

export default function FilterPills({ name, handlePillClick }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    handlePillClick(name);
    setClicked((prev) => !prev);
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
