import CurrentQuestion from "@/components/__helperComponents__/survey/CurrentQuestion";

function AddMoreQuestionPop({
  questionNumber,
  surveyId,
  setPop,
  setQuestionList,
}) {
  return (
    <div className="update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center ">
      <div className="w-3/4">
        <CurrentQuestion
          questionNumber={questionNumber + 1}
          surveyId={surveyId}
          setPop={setPop}
          setQuestionList={setQuestionList}
        />
      </div>
    </div>
  );
}

export default AddMoreQuestionPop;
