import { useState } from "react";
import FilterValues from "./FilterValues";

export default function Filter({ dataTypeId, filter }) {
  const [isExpand, setIsExpand] = useState(false);
  const [options, setOptions] = useState(filter.options);

  return (
    <div className="flex h-fit flex-col gap-4 rounded-md border border-[#DDD] bg-white px-8 py-6">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpand(!isExpand)}
      >
        <span className="text-lg font-medium capitalize">
          {filter.key_name}
        </span>
        <i className={`fa-solid fa-angles-${!isExpand ? "down" : "up"}`}></i>
      </div>

      {isExpand ? (
        <FilterValues
          dataTypeId={dataTypeId}
          filterId={filter.id}
          isSelect={filter.is_select}
          options={options}
          setOptions={setOptions}
        />
      ) : null}
    </div>
  );
}
