import CurrentQuestion from "@/components/__helperComponents__/survey/CurrentQuestion";

function EditPop({
  question,
  setEditPop,
  surveyId,
  questionNo,
  setQuestionList,
}) {
  return (
    <div className="update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center ">
      <div className="w-3/4">
        <CurrentQuestion
          questionNumber={questionNo + 1}
          surveyId={surveyId}
          question={question}
          setEditPop={setEditPop}
          setQuestionList={setQuestionList}
        />
      </div>
    </div>
  );
}

export default EditPop;
