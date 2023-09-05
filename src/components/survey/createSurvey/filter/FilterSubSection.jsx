import { useState } from "react";
import FilterOption from "./FilterOption";

export default function FilterSubSection({ filterData, setProfileData }) {
    const [filterValues, setFilterValues] = useState({});

    const handleOptionClick = (index, clicked) => {
        setFilterValues((prevOptions) => ({
            ...prevOptions,
            [index]: !clicked,
        }));
    };

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (checked) {
            setProfileData((prevProfileData) => ({
                ...prevProfileData,
                [name]: [...(prevProfileData[name] || []), value],
            }));
        } else {
            setProfileData((prevProfileData) => ({
                ...prevProfileData,
                [name]: (prevProfileData[name] || []).filter(
                    (item) => item !== value
                ),
            }));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="heading mb-0"> {filterData.dataType} Filters </h1>

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

            {/* Render input fields based on selected options */}
            {/* TODO: That's some ungodly levels of nesting */}
            <div className="grid grid-cols-5 gap-8">
                {filterData.key.map(
                    (data, index) =>
                        filterValues[index] && (
                            <>
                                {data.is_select ? (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4 bg-white p-4 rounded-lg"
                                    >
                                        <div className="capitalize text-lg font-semibold w-[10vw]">
                                            {data.key_name}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {data.options.map(
                                                (option, index) => (
                                                    <label className="cursor-pointer">
                                                        <input
                                                            key={index}
                                                            name={data.key_name}
                                                            className="mr-2"
                                                            type="checkbox"
                                                            value={option}
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <span className="font-medium">
                                                            {option}
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-8 items-center">
                                        <div className="capitalize text-lg font-semibold w-[10vw]">
                                            {data.key_name}:
                                        </div>
                                        {/* <FilterSlider filter={data} /> */}
                                    </div>
                                )}
                            </>
                        )
                )}
            </div>
        </div>
    );
}
