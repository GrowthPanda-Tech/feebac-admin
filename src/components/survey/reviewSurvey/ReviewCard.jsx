import { useState } from "react";
import EditPop from "../surveyEdit/EditPop";

export default function ReviewCard({
    index,
    question,
    isEdit,
    surveyId,
    setQuestionList,
    questionList,
    setSurveyInfo,
}) {
    const [editPop, setEditPop] = useState(false);

    let type;
    if (question.question_type.type_name === "radio") {
        type = "Single-Choice";
    } else if (question.question_type.type_name === "checkbox")
        type = "Multiple-Choice";
    else if (question.question_type.type_name === "yes-no") {
        type = "Yes-No";
    } else type = "text";
    return (
        <>
            <div className="p-4">
                <div className="text-secondary mb-6  justify-between w-full flex font-semibold">
                    Question {index + 1} ({type})
                    {isEdit && (
                        <button
                            onClick={() => {
                                setEditPop(!false);
                            }}
                        >
                            Edit
                        </button>
                    )}
                </div>
                <div className="flex rounded-lg  bg-white h-full shadow-xl p-8 flex-col">
                    <div className="flex items-center mb-3">
                        <h2 className="text-black text-lg font-medium">
                            {question.question_title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-evenly flex-grow">
                        {Object.values(question.question_values).map(
                            (option, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="mt-4 flex justify-between font-bold">
                                        {option}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            {editPop && (
                <EditPop
                    question={question}
                    setEditPop={setEditPop}
                    type={type}
                    surveyId={surveyId}
                    questionNo={index}
                    setQuestionList={setQuestionList}
                    questionList={questionList}
                    setSurveyInfo={setSurveyInfo}
                />
            )}
        </>
    );
}
