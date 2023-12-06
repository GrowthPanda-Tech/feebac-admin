import { useState } from "react";
import EditPop from "../surveyEdit/EditPop";

export default function ReviewCard({
  index,
  question,
  surveyId,
  setQuestionList,
  questionList,
  setSurveyInfo,
}) {
  const questionType = question.question_type.type_name;

  const [editPop, setEditPop] = useState(false);

  let type = "Text-Answer";
  switch (questionType) {
    case "radio":
      type = "Single-Choice";
      break;

    case "checkbox":
      type = "Multiple-Choice";
      break;

    default:
      break;
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-secondary justify-between w-full flex font-semibold">
          Question {index + 1} ({type})
          <button
            onClick={() => {
              setEditPop(!editPop);
            }}
          >
            <i className="fa-regular fa-pen-to-square text-xl"></i>
          </button>
        </div>
        <div className="flex rounded-lg  bg-white h-full shadow-xl p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-black text-lg font-medium">
              {question.question_title}
            </h2>
          </div>
          <div className="flex flex-col justify-evenly flex-grow">
            {Object.values(question.question_values).map((option, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="mt-4 flex justify-between font-bold">
                  {option}
                </div>
              </div>
            ))}
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
