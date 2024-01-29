import { useState } from "react";

//components
import { Checkbox, Select, Option } from "@material-tailwind/react";
import QuestionInput from "./QuestionInput";
import TertFilterCreate from "@/components/__utilComponents__/TertFilterCreate";

//utils
import { revertOptions } from "@/utils/revertOptions";

export default function QuestionTitle(props) {
  const {
    questionNumber,
    questionState,
    setQuestionState,
    tertiaryFilters,
    setOptionState,
    isRerun,
  } = props;

  const { profile_field = null, question_title = "" } = questionState || {};

  const checked = !!profile_field;

  //states
  const [isCreateFilter, setIsCreateFilter] = useState(false);

  const handleClick = () => {
    setOptionState((prev) => revertOptions(prev));
    setQuestionState((prev) => ({
      ...prev,
      profile_field: checked ? null : " ",
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Question {questionNumber}</span>

        {/* Filter Selector */}
        {!isRerun ? (
          <div className="flex gap-4">
            <button
              type="button"
              className="text-lg font-medium text-[#EA525F] transition hover:text-black"
              onClick={() => setIsCreateFilter(true)}
            >
              Create Filter
            </button>
            <div className="flex gap-2">
              <Checkbox
                ripple={false}
                onClick={handleClick}
                checked={checked}
              />
              <div className="w-52">
                <Select
                  label="Select Filter"
                  //have to typecast it to string
                  //this component won't accept number as value
                  value={profile_field ? profile_field.toString() : undefined}
                  onChange={(value) =>
                    setQuestionState((prev) => ({
                      ...prev,
                      //backend needs it in number
                      profile_field: parseInt(value),
                    }))
                  }
                  disabled={!checked}
                >
                  {tertiaryFilters.map(({ id, key_name }) => (
                    <Option key={id} value={id.toString()}>
                      {key_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <QuestionInput
        name={"question_title"}
        value={question_title}
        setState={(event) => {
          setQuestionState((prev) => {
            const { name, value } = event.target;
            if (value.trim() === "" && value.length === 1) return prev;
            return { ...prev, [name]: value };
          });
        }}
      />

      {isCreateFilter ? (
        <div
          className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center`}
          onClick={() => setIsCreateFilter(false)}
        >
          <TertFilterCreate
            stopPropgation={(e) => e.stopPropagation()}
            setIsFilterCreate={setIsCreateFilter}
          />
        </div>
      ) : null}
    </div>
  );
}
