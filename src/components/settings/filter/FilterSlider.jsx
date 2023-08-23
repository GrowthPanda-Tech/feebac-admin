import { useState } from "react";
import { Slider } from "@mui/material";

export default function FilterSlider({filter}) {
    const [sliderVal, setSliderVal] = useState(filter.options);
    const handleChange = (event, newVal) => setSliderVal(newVal);

    return (
        <>
            <span> {sliderVal[0]} - {sliderVal[1]} </span>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={sliderVal}
                onChange={handleChange}
            />
        </>
    );
}

