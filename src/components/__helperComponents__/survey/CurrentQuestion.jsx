//hooks
import { useState, useMemo } from "react";

//contexts
import { useFilterContext } from "@/contexts/FilterContext";

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
  const {
    questionNumber = 1,
    surveyId,
    question,
    setPop,
    setQuestionList,
    isRerun,
  } = props;
  const { fetchedData } = useFilterContext();

  const TERTIARY_FILTERS = useMemo(
    () => fetchedData?.data[2]?.key,
    [fetchedData],
  );

  const INIT_SURVEY = useMemo(() => {
    const {
      question_id = null,
      profile_field = { id: null },
      question_title = "",
      question_type = { type_id: 2 },
      question_values = { 1: "", 2: "" },
    } = question || {};

    return {
      survey_id: surveyId,
      profile_field: profile_field?.id || null,
      question_id,
      question_title,
      question_type: question_type?.type_id || 2,
      question_values,
    };
  }, [question, surveyId]);

  //states
  const [loading, setLoading] = useState(false);
  const [questionState, setQuestionState] = useState(INIT_SURVEY);
  const [optionState, setOptionState] = useState(
    initWithUUID(Object.values(questionState.question_values)),
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const question_values = arrangeOptions(optionState);
    const request = { ...questionState, question_values };

    const route = question ? "survey/update-question" : "survey/add-question";
    const method = question ? "PUT" : "POST";

    setLoading(true);

    try {
      const response = await makeRequest(route, method, request);
      if (!response.isSuccess) throw new Error(response.message);

      /* Manage state */
      if (setPop) {
        setPop((prev) => !prev);
        //search for that question and update it
        setQuestionList((prev) => {
          const currList = structuredClone(prev);
          const updateIndex = currList.findIndex(
            (question) => question.question_id === questionState.question_id,
          );

          //element not found
          if (updateIndex === -1) return [...currList, response.data];

          currList[updateIndex] = response.question;
          return currList;
        });
      } else {
        setQuestionState(INIT_SURVEY);
        setOptionState(initWithUUID(["", ""]));
        setQuestionList((prev) => [...prev, response.data]);
      }
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-12 rounded-md bg-white px-8 py-10">
        <QuestionTitle
          questionNumber={questionNumber}
          questionState={questionState}
          setQuestionState={setQuestionState}
          tertiaryFilters={TERTIARY_FILTERS}
          setOptionState={setOptionState}
          isRerun={isRerun}
        />

        <QuestionTypeSelector
          type={questionState.question_type}
          setQuestionState={setQuestionState}
        />

        <QuestionOptions
          questionState={questionState}
          optionState={optionState}
          setOptionState={setOptionState}
          tertiaryFilters={TERTIARY_FILTERS}
          isRerun={isRerun}
        />

        <QuestionActionRow
          questionState={questionState}
          setOptionState={setOptionState}
          setPop={setPop}
          loading={loading}
        />
      </div>
    </form>
  );
}
