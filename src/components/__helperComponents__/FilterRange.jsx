import { useState, useEffect } from "react";
import { populateRangeOptions } from "@/utils/populateRangeOptions";
import { Select, Option } from "@material-tailwind/react";

function Selection({ label, value, rangeOptions, handleChange }) {
  return (
    <Select
      label={label}
      value={value.toString()}
      onChange={(value) => handleChange(label, value)}
    >
      {rangeOptions.map((option) => (
        <Option key={option} value={option.toString()}>
          {option}
        </Option>
      ))}
    </Select>
  );
}

export default function FilterRange({ keyName, options, setTarget }) {
  const [min, max] = options.map((option) => parseInt(option.name));
  const rangeOptions = populateRangeOptions(min, max);

  const [value, setValue] = useState({ min, max });

  const handleChange = (type, value) => {
    setValue((prev) => ({ ...prev, [type]: parseInt(value) }));
  };

  useEffect(() => {
    setTarget((prev) => {
      const prevClone = structuredClone(prev);
      prevClone[keyName] = [value.min, value.max];
      return prevClone;
    });
  }, [setTarget, keyName, value]);

  return (
    <div className="flex h-full flex-col items-center justify-evenly">
      <Selection
        label={"min"}
        value={value.min}
        rangeOptions={rangeOptions}
        handleChange={handleChange}
      />
      <Selection
        label={"max"}
        value={value.max}
        rangeOptions={rangeOptions}
        handleChange={handleChange}
      />
    </div>
  );
}
