import { useState } from "react";

export default function FilterOption({ name, index, onFilterClick }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onFilterClick(index, clicked);
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
