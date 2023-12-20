import { useState } from "react";
import FilterOption from "./FilterOption";
import FilterSlider from "./FilterSlider";

function Selection({ data, handleChange }) {
  return (
    <div className="flex flex-col gap-2">
      {data.options.map((option, index) => (
        <label className="cursor-pointer">
          <input
            key={index}
            name={data.key_name}
            className="mr-2"
            type="checkbox"
            value={option}
            onChange={handleChange}
          />
          <span className="font-medium">{option}</span>
        </label>
      ))}
    </div>
  );
}

//
// function RangeCard() {
//     return (
//
//     )
// }

export default function FilterSubSection({ filterData, setProfileData }) {
  const [filterValues, setFilterValues] = useState({});

  const handleOptionClick = (index, clicked) => {
    setFilterValues((prev) => ({
      ...prev,
      [index]: !clicked,
    }));

    if (clicked) {
      setProfileData((prev) => {
        const { key_name } = filterData.key[index];
        const { [key_name]: omitKey, ...newProfileData } = prev;
        return newProfileData;
      });
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setProfileData((prev) => ({
        ...prev,
        [name]: [...(prev[name] || []), value],
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: (prev[name] || []).filter((item) => item !== value),
      }));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-medium">{filterData.dataType} Filters</h1>

      {/* Pills */}
      <div className="flex gap-4">
        {filterData.key.map((data, index) => (
          <FilterOption
            key={index}
            name={data.key_name}
            index={index}
            onFilterClick={handleOptionClick}
          />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-8">
        {filterData.key.map((data, index) =>
          filterValues[index] ? (
            <div
              key={index}
              className="flex flex-col gap-4 bg-white p-4 rounded-lg h-[12rem] overflow-y-scroll"
            >
              <div className="capitalize text-lg font-semibold">
                {data.key_name}
              </div>
              {data.is_select ? (
                <Selection data={data} handleChange={handleChange} />
              ) : (
                <FilterSlider filter={data} setProfileData={setProfileData} />
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
