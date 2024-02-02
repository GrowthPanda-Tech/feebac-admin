import { useState } from "react";

//components
import FilterSearchBar from "@helperComps/FilterSearchBar";
import FilterMultiSelect from "@helperComps/FilterMultiSelect";
import FilterRange from "@helperComps/FilterRange";

export default function Filtercard({ data, dataType, setTarget }) {
  const { key_name, is_select, options } = data;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="no-scrollbar flex aspect-square w-80 flex-col gap-4 overflow-y-scroll rounded-lg bg-white p-8 shadow-lg">
      <span className="capitalize">{key_name}</span>
      {is_select ? (
        <>
          <FilterSearchBar value={searchTerm} setter={setSearchTerm} />
          <FilterMultiSelect
            dataType={dataType}
            keyName={key_name}
            options={options}
            searchTerm={searchTerm}
            setTarget={setTarget}
          />
        </>
      ) : (
        <FilterRange
          keyName={key_name}
          options={options}
          setTarget={setTarget}
        />
      )}
    </div>
  );
}
