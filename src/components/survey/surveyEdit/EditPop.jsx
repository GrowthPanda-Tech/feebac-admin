import EditQuestion from "./EditQuestion";

function EditPop({
  question,
  setEditPop,
  surveyId,
  questionNo,
  setQuestionList,
  setSurveyInfo,
}) {
  return (
    <div className="update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center ">
      <div className="flex flex-col">
        <EditQuestion
          surveyId={surveyId}
          questions={question}
          questionNo={questionNo}
          setEditPop={setEditPop}
          setQuestionList={setQuestionList}
          setSurveyInfo={setSurveyInfo}
        />
      </div>
    </div>
  );
}

export default EditPop;
