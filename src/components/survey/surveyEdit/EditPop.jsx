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
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
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
