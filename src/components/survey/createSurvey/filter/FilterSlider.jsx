import { React, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useEffect } from "react";

export default function FilterSlider({ filter, setProfileData }) {
    console.log(filter?.key_name);
    const [minValue, setMinValue] = useState(filter && filter?.options[0]);
    const [maxValue, setMaxValue] = useState(filter && filter?.options[1]);
    const handleInput = (e) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
    };

    useEffect(() => {
        setProfileData((prev) => ({
            ...prev,
            [filter?.key_name]: [minValue, maxValue],
        }));
    }, [maxValue, minValue]);

    return (
        <div className="w-full">
            {filter && (
                <MultiRangeSlider
                    name={filter?.key_name}
                    min={filter?.options[0]}
                    max={filter?.options[1]}
                    step={1}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                    label={false}
                    ruler={false}
                    style={{
                        border: "none",
                        boxShadow: "none",
                        padding: "15px 10px",
                    }}
                    barLeftColor="#979797"
                    barInnerColor="#EA525F"
                    barRightColor="#979797"
                    thumbLeftColor="#EA525F"
                    thumbRightColor="#EA525F"
                />
            )}
        </div>
    );
}
