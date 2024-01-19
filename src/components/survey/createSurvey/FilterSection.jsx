import { useState, useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

import Filtercard from "@utilComps/FilterCard";
import FilterPills from "@helperComps/FilterPills";

export default function FilterSection({ route, setParamObj, setTarget }) {
  const { fetchedData } = useContext(FilterContext);
  const [clickedFilters, setClickedFilters] = useState([]);

  const handleClick = (filterName) => {
    const updatedFilters = clickedFilters.includes(filterName)
      ? clickedFilters.filter((name) => name !== filterName)
      : [...clickedFilters, filterName];

    setClickedFilters(updatedFilters);
  };

  return (
    <div className="flex flex-col gap-8">
      {fetchedData?.data.map(({ id, dataType, key }) => (
        <div key={id} className="flex flex-col gap-4">
          <h1 className="text-xl font-medium">{dataType} filters</h1>
          <div className="flex flex-wrap gap-4">
            {key.map(({ id, key_name }) => (
              <FilterPills
                key={id}
                name={key_name}
                handlePillClick={handleClick}
              />
            ))}
          </div>
          <div className="flex gap-6">
            {key
              .filter((data) => clickedFilters.includes(data.key_name))
              .map((data) => (
                <Filtercard
                  key={data.id}
                  data={data}
                  route={route}
                  setParamObj={setParamObj}
                  setTarget={setTarget}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
