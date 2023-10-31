import { useState } from "react";
import FilterValues from "./FilterValues";

export default function Filter({ filter, index }) {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className="h-fit bg-white py-6 px-8 flex gap-4 flex-col rounded-md border border-[#DDD]">
            <div
                className="cursor-pointer flex items-center justify-between"
                onClick={() => setIsExpand(!isExpand)}
            >
                <span className="font-medium text-lg capitalize">
                    {filter.key_name}
                </span>
                <i
                    className={`fa-solid fa-angles-${
                        !isExpand ? "down" : "up"
                    }`}
                />
            </div>

            {isExpand ? (
                <FilterValues filter={filter} filterIdx={index} />
            ) : null}
        </div>
    );
}
