//hooks
import { useState, useMemo } from "react";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";
import { initWithUUID } from "@/utils/initWithUUID";
import { arrangeOptions } from "@/utils/arrangeOptions";

//components
import QuestionTitle from "./helper/QuestionTitle";
import QuestionTypeSelector from "./helper/QuestionTypeSelector";
import QuestionOptions from "./helper/QuestionOptions";
import QuestionActionRow from "./helper/QuestionActionRow";

export default function CurrentQuestion(props) {
  const { questionNumber = 1, surveyId, setQuestionList } = props;

  //needs survey ID from the render scope
  const INIT_SURVEY = useMemo(
    () => ({
      surveyId,
      questionTitle: "",
      questionType: 2,
      questionValue: {}, //TODO: can I use this somehow in the render pass?
    }),
    [surveyId],
  );

  const [questionState, setQuestionState] = useState(INIT_SURVEY);
  const [optionState, setOptionState] = useState(initWithUUID(["", ""]));
  const [loading, setLoading] = useState(false);

  //calculate option arrange during rendering
  const questionValue = useMemo(
    () => arrangeOptions(optionState),
    [optionState],
  );

  /* Event handlers */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const request = { ...questionState, questionValue };

    setLoading(true);

    try {
      const response = await makeRequest(
        "survey/add-question",
        "POST",
        request,
      );

      if (!response.isSuccess) throw new Error(response.message);

      /* Manage state */

      //reset state
      setQuestionState(INIT_SURVEY);
      setOptionState(initWithUUID(["", ""]));

      //send result back to parent component
      setQuestionList((prev) => [...prev, request]);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          optionState={optionState}
          setOptionState={setOptionState}
        />

        <QuestionActionRow
          questionState={questionState}
          setOptionState={setOptionState}
          loading={loading}
        />
      </div>
    </form>
  );
}
