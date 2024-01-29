//components
import { Checkbox, Select, Option } from "@material-tailwind/react";
import QuestionInput from "./QuestionInput";

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
          <div className="flex gap-2">
            <Checkbox ripple={false} onClick={handleClick} checked={checked} />
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
        ) : null}
      </div>
      <QuestionInput
        name={"question_title"}
        value={question_title}
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
