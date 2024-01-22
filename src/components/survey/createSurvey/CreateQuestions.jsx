import { useState } from "react";

//components
import PageTitle from "@/components/__helperComponents__/PageTitle";
import CurrentQuestion from "@/components/__helperComponents__/survey/CurrentQuestion";
import QuestionActions from "@/components/__helperComponents__/survey/QuestionActions";
import QuestionReview from "@/components/__helperComponents__/survey/QuestionReview";

export default function CreateQuestions({ surveyId, surveyTitle }) {
  const [questionList, setQuestionList] = useState([]);

  return (
    <div className="flex flex-col gap-12">
      <PageTitle name={surveyTitle} />

      {/* <QuestionReview questionList={questionList} /> */}

      <CurrentQuestion
        questionNumber={questionList.length + 1}
        surveyId={surveyId}
        setQuestionList={setQuestionList}
      />

      {/* Minimum of 1 question is required for the survey to go live */}
      {questionList.length > 0 && <QuestionActions surveyId={surveyId} />}
    </div>
  );
}
