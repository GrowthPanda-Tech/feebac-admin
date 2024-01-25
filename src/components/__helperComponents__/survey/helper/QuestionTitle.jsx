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
  } = props;

  const { profile_field = null, question_title = "" } = questionState || {};

  const checked = profile_field ? true : false;

  const handleClick = () => {
    setQuestionState((prev) => ({ ...prev, profile_field: null }));
    setOptionState((prev) => revertOptions(prev));
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
            defaultChecked={checked}
          />
          <div className="w-52">
            <Select
              label="Select Filter"
              value={profile_field}
              onChange={(value) =>
                setOptionState((prev) => ({ ...prev, profile_field: value }))
              }
              disabled={!checked}
            >
              {tertiaryFilters.map(({ id, key_name }) => (
                <Option key={id} value={key_name}>
                  {key_name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
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
