//components
import { Select, Option } from "@material-tailwind/react";
import QuestionInput from "./QuestionInput";

//utils
import { transformOptions } from "@/utils/transformOptions";
import { searchTertKeys } from "@/utils/searchTertKeys";

//assets
import delete_options from "@/assets/delete.svg";

export default function QuestionOptions(props) {
  const {
    questionState,
    optionState,
    setOptionState,
    tertiaryFilters,
    isRerun,
  } = props;
  const { profile_field } = questionState;

  const keywords = searchTertKeys({
    tertKeys: tertiaryFilters,
    filterId: parseInt(profile_field),
  });

  return (
    <div className="flex flex-col gap-4">
      {optionState.map(({ element, uuid }, index) => {
        let value = element;
        let keyword = null;

        if (Array.isArray(element)) {
          value = element[0];
          keyword = element[1];
        }

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

            {profile_field && !isRerun ? (
              <div className="w-52">
                <Select
                  label="Select Keywords"
                  value={keyword}
                  onChange={(value) => {
                    const transform = transformOptions({
                      options: optionState,
                      keyword: value,
                      index,
                    });

                    console.log(transform);

                    setOptionState(transform);
                  }}
                >
                  {keywords.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </div>
            ) : null}

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
