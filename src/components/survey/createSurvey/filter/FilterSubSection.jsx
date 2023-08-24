import { useState } from "react";
import FilterOption from "./FilterOption";
import { Slider } from "@mui/material";

function FilterSlider({filter}) {
    const [sliderVal, setSliderVal] = useState(filter.options);
    const handleChange = (event, newVal) => setSliderVal(newVal);

    return (
        <Slider
            value={sliderVal}
            valueLabelDisplay="auto"
            onChange={handleChange}
        />
    );
}

export default function FilterSubSection({ filterName, filterData }) {
    const [filterValues, setFilterValues] = useState({});

    const handleOptionClick = (index, clicked) => {
        setFilterValues(prevOptions => ({
            ...prevOptions,
            [index]: !clicked
        }));
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="heading mb-0"> {filterName} Filters </h1>
            <div className="flex gap-4">
                {
                    filterData.map((data, index) => (
                        <FilterOption 
                            key={index}
                            name={data.key_name}
                            index={index}
                            onFilterClick={handleOptionClick}
                        />
                    ))
                }
            </div>

            {/* Render input fields based on selected options */}
            {
                filterData.map((data, index) => (
                    filterValues[index] && (
                        <div className="w-1/2">
                            {
                                data.is_select ? 
                                    <div className="flex gap-8">
                                        <div className="capitalize text-lg font-semibold w-[10vw]"> {data.key_name}: </div>
                                        <div className="flex flex-col">
                                            {
                                                data.options.map((option) => (
                                                    <label>
                                                        <input type="checkbox" value={option} />
                                                        <span> {option} </span>
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    </div>
                                :
                                    <div className="flex gap-8 items-center">
                                        <div className="capitalize text-lg font-semibold w-[10vw]"> {data.key_name}: </div>
                                        <FilterSlider filter={data} />
                                    </div>
                            }
                        </div>
                    )
                ))
            }
        </div>
    );
}

