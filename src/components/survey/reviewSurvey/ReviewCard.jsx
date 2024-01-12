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
        <div className="flex w-full justify-between font-semibold text-secondary">
          Question {index + 1} ({type})
          <button
            onClick={() => {
              setEditPop(!editPop);
            }}
          >
            <i className="fa-regular fa-pen-to-square text-xl"></i>
          </button>
        </div>
        <div className="flex h-80 flex-col gap-8 overflow-y-scroll rounded-lg bg-white p-8 font-semibold shadow-md">
          <h2 className="text-black">{question.question_title}</h2>
          <div className="flex flex-col gap-6 opacity-60">
            {Object.values(question.question_values).map((option, index) => (
              <div key={index}>{option}</div>
            ))}
          </div>
        </div>
      </div>

      {editPop && (
        <EditPop
          question={question}
          setEditPop={setEditPop}
          surveyId={surveyId}
          questionNo={index}
          setQuestionList={setQuestionList}
          setSurveyInfo={setSurveyInfo}
        />
      )}
    </>
  );
}
