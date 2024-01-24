//components
import { Select, Option } from "@material-tailwind/react";
import QuestionInput from "./QuestionInput";

//utils
import { transformOptions } from "@/utils/transformOptions";

//assets
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

  //takes into account the 0 index (falsy value)
  const keywords =
    tertFilterIdx !== undefined && tertFilterIdx !== null
      ? tertiaryFilters[tertFilterIdx]?.options ?? [defaultKeywordOption]
      : [defaultKeywordOption];

  return (
    <div className="flex flex-col gap-4">
      {optionState.map(({ element, uuid }, index) => {
        //check if keyword is present
        const value = Array.isArray(element) ? element[0] : element;

        return (
          <div key={uuid} className="flex items-center justify-between gap-8">
            <QuestionInput
              value={value}
              setState={(event) =>
                setOptionState((prev) => {
                  const { value } = event.target;

                  //has reference object
                  const curr = structuredClone(prev);

                  if (Array.isArray(curr[index].element)) {
                    curr[index].element[0] = value;
                  } else {
                    curr[index].element = value;
                  }

                  return curr;
                })
              }
            />

            {isFilterChecked && (
              <div className="w-52">
                <Select
                  label="Select Keywords"
                  //onChange returns value. thanks the lord!!
                  onChange={(value) => {
                    const transform = transformOptions({
                      options: optionState,
                      keyword: value,
                      index,
                    });

                    setOptionState(transform);
                  }}
                >
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
        );
      })}
    </div>
  );
}
