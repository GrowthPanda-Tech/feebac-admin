import Question from "../createSurvey/Question";

function AddMoreQuestionPop({
  surveyInfo,
  setQuestionAddPop,
  setQuestionList,
  setSurveyInfo,
}) {
  return (
    <div className="update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center ">
      <Question
        surveyId={surveyInfo?.survey_id}
        surveyTitle={surveyInfo?.survey_title}
        editAdd={true}
        surveyInfo={surveyInfo}
        setSurveyInfo={setSurveyInfo}
        setQuestionAddPop={setQuestionAddPop}
        setQuestionList={setQuestionList}
      />
    </div>
  );
}

export default AddMoreQuestionPop;
