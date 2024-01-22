//hooks
import { useState, useMemo } from "react";

//utils
import { initWithUUID } from "@/utils/initWithUUID";

//components
import QuestionTitle from "./helper/QuestionTitle";
import QuestionTypeSelector from "./helper/QuestionTypeSelector";
import QuestionOptions from "./helper/QuestionOptions";
import QuestionActionRow from "./helper/QuestionActionRow";

export default function CurrentQuestion(props) {
  const { questionNumber = 1, surveyId } = props;

  //needs survey ID from the render scope
  const INIT_STATE = useMemo(
    () => ({
      surveyId,
      questionTitle: "",
      questionType: 2,
      questionValue: {},
    }),
    [surveyId],
  );

  const [questionState, setQuestionState] = useState(INIT_STATE);
  const [optionState, setOptionState] = useState(["", ""]);

  //TODO: generates a new id for every type
  const optionsWithIDs = useMemo(
    () => initWithUUID(optionState),
    [optionState],
  );

  return (
    <div className="flex flex-col gap-12 rounded-md bg-white px-8 py-10">
      <QuestionTitle
        questionNumber={questionNumber}
        value={questionState.questionTitle}
        setState={setQuestionState}
      />

      <QuestionTypeSelector
        type={questionState.questionType}
        setType={setQuestionState}
      />

      <QuestionOptions
        mappableOptions={optionsWithIDs}
        optionState={optionState}
        setOptionState={setOptionState}
      />

      <QuestionActionRow
        questionState={questionState}
        setOptionState={setOptionState}
      />
    </div>
  );
}
