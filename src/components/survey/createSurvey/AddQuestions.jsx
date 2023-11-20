import React from "react";
import { useLocation } from "react-router-dom";
import Question from "./Question";

function AddQuestions() {
  const location = useLocation();
  const surveyId = location?.state.surveyId;
  const surveyTitle = location?.state.surveyTitle;
  return (
    <div>
      {surveyId && <Question surveyId={surveyId} surveyTitle={surveyTitle} />}
    </div>
  );
}

export default AddQuestions;
