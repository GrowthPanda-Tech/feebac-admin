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
          questions={question}
          setEditPop={setEditPop}
          surveyId={surveyId}
          questionNo={questionNo}
          setQuestionList={setQuestionList}
          setSurveyInfo={setSurveyInfo}
        />
      </div>
    </div>
  );
}

export default EditPop;
