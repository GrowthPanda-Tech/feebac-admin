//hooks
import { useState } from "react";

//components
import { Checkbox, Select, Option } from "@material-tailwind/react";
import QuestionInput from "./QuestionInput";

//utils
import { revertOptions } from "@/utils/revertOptions";

export default function QuestionTitle(props) {
  const {
    questionNumber,
    value,
    setQuestionState,
    isFilterChecked,
    setIsFilterChecked,
    tertiaryFilters,
    setTertFilterIdx,
    setOptionState,
    selectVal,
    setSelectVal,
  } = props;

  //TODO: this might be a bit buggy
  //I don't have any validation for if it is checked or not
  const handleClick = () => {
    setIsFilterChecked((prev) => !prev);
    setSelectVal(undefined);
    setTertFilterIdx(null);
    setOptionState((prev) => {
      const update = revertOptions(prev);
      return update;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Question {questionNumber}</span>

        {/* Filter Selector */}
        <div className="flex gap-2">
          <Checkbox
            ripple={false}
            onClick={handleClick}
            checked={isFilterChecked}
          />
          <div className="w-52">
            <Select
              label="Select Filter"
              value={selectVal}
              onChange={(value) => setSelectVal(value)}
              disabled={!isFilterChecked}
            >
              {tertiaryFilters.map(({ id, key_name }, index) => (
                <Option
                  key={id}
                  value={key_name}
                  onClick={() => setTertFilterIdx(index)}
                >
                  {key_name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <QuestionInput
        name={"questionTitle"}
        value={value}
        setState={(event) =>
          setQuestionState((prev) => {
            const { name, value } = event.target;
            return { ...prev, [name]: value };
          })
        }
      />
    </div>
  );
}
