import { useState } from "react";
import FilterValues from "./FilterValues";

export default function Filter({ id, keyName, options, filterIdx }) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className="flex h-fit flex-col gap-4 rounded-md border border-[#DDD] bg-white px-8 py-6">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpand(!isExpand)}
      >
        <span className="text-lg font-medium capitalize">{keyName}</span>
        <i className={`fa-solid fa-angles-${!isExpand ? "down" : "up"}`}></i>
      </div>

      {isExpand ? (
        <FilterValues id={id} options={options} filterIdx={filterIdx} />
      ) : null}
    </div>
  );
}
