import { useState } from "react";

export default function FilterOption({ name, index, onFilterClick }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        onFilterClick(index, clicked);
    }

    return (
        <div
            className={`capitalize p-2 px-4 ${clicked ? 'bg-secondary text-white' : 'bg-white'} w-fit rounded-xl font-medium cursor-pointer`}
            onClick={handleClick}>
            {name}
        </div>
    );
}

