import { useState } from "react";
import { Checkbox, Select, Option } from "@material-tailwind/react";

import QuestionInput from "./QuestionInput";

export default function QuestionTitle(props) {
  const {
    questionNumber,
    value,
    setQuestionState,
    isFilterChecked,
    setIsFilterChecked,
    tertiaryFilters,
    setTertFilterIdx,
  } = props;

  /* https://www.material-tailwind.com/docs/react/select */
  //TLDR: Default value of Select component is undefined
  const [selectVal, setSelectVal] = useState(undefined);

  //TODO: this might be a bit buggy
  //I don't have any validation for if it is checked or not
  const handleClick = () => {
    setIsFilterChecked((prev) => !prev);
    setSelectVal(undefined);
    setTertFilterIdx(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Question {questionNumber}</span>

        {/* Filter Selector */}
        <div className="flex gap-2">
          <Checkbox ripple={false} onClick={handleClick} />
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
