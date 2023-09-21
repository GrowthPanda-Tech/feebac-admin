import React from "react";
import Question from "../createSurvey/Question";

function AddMoreQuestionPop({
    surveyInfo,
    setQuestionAddPop,
    setQuestionList,
}) {
    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
            <Question
                surveyId={surveyInfo?.survey_id}
                surveyTitle={surveyInfo?.survey_title}
                editAdd={true}
                surveyInfo={surveyInfo}
                setQuestionAddPop={setQuestionAddPop}
                setQuestionList={setQuestionList}
            />
        </div>
    );
}

export default AddMoreQuestionPop;
