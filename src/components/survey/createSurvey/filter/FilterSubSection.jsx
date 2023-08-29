import { useState, useContext } from "react";
import { Slider } from "@mui/material";
import { SurveyContext } from "../../../../contexts/SurveyContext";
import FilterOption from "./FilterOption";

function FilterSlider({ filter }) {
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
    const { surveyData, setSurveyData } = useContext(SurveyContext);
    const [profileData, setprofileData] = useState({});

    const handleOptionClick = (index, clicked) => {
        setFilterValues((prevOptions) => ({
            ...prevOptions,
            [index]: !clicked,
        }));
    };

    const handleChange = (event) => {
        let isChecked = event.target.checked;
        isChecked &&
            setprofileData({
                ...profileData,
                [event.target.name]: [event.target.value],
            });
    };

    // console.log(profileData);
    console.log(filterData);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="heading mb-0"> {filterData.dataType} Filters </h1>
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

            {/* Render input fields based on selected options */}
            {filterData.key.map(
                (data, index) =>
                    filterValues[index] && (
                        <div className="w-1/2">
                            {data.is_select ? (
                                <div className="flex gap-8">
                                    <div className="capitalize text-lg font-semibold w-[10vw]">
                                        {data.key_name}:
                                    </div>
                                    <div className="flex flex-col">
                                        {data.options.map((option) => (
                                            <label>
                                                <input
                                                    name={data.key_name}
                                                    type="checkbox"
                                                    value={option}
                                                    onChange={handleChange}
                                                />
                                                <span> {option} </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-8 items-center">
                                    <div className="capitalize text-lg font-semibold w-[10vw]">
                                        {data.key_name}:
                                    </div>
                                    <FilterSlider filter={data} />
                                </div>
                            )}
                        </div>
                    )
            )}
        </div>
    );
}
