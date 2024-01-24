import { Select, Option } from "@material-tailwind/react";

import QuestionInput from "./QuestionInput";
import delete_options from "@/assets/delete.svg";

export default function QuestionOptions(props) {
  const {
    optionState,
    setOptionState,
    tertFilterIdx,
    tertiaryFilters,
    isFilterChecked,
  } = props;

  const defaultKeywordOption = { id: 0, name: undefined };

  //takes into account for 0 index (falsy value)
  const keywords =
    tertFilterIdx !== undefined && tertFilterIdx !== null
      ? tertiaryFilters[tertFilterIdx]?.options ?? [defaultKeywordOption]
      : [defaultKeywordOption];

  return (
    <div className="flex flex-col gap-4">
      {optionState.map(({ element, uuid }, index) => (
        <div key={uuid} className="flex items-center justify-between gap-8">
          <QuestionInput
            value={element}
            //TODO: dispatch actions
            setState={(event) =>
              setOptionState((prev) => {
                const { value } = event.target;
                const curr = [...prev];

                if (!curr[index]) return (curr[index] = value);

                curr[index].element = value;
                return curr;
              })
            }
          />

          {isFilterChecked && (
            <div className="w-52">
              <Select label="Select Keywords">
                {keywords.map(({ id, name }) => (
                  <Option key={id} value={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {optionState.length > 2 && (
            <img
              src={delete_options}
              alt="Delete option"
              className="cursor-pointer"
              onClick={() =>
                setOptionState((prev) => prev.filter((_, i) => i !== index))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
