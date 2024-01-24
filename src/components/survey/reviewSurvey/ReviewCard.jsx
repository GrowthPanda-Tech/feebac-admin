import { useState } from "react";
import EditPop from "../surveyEdit/EditPop";

export default function ReviewCard({
  index,
  question,
  surveyId,
  setQuestionList,
  setSurveyInfo,
}) {
  const [editPop, setEditPop] = useState(false);

  const questionType = question.question_type.type_name;
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
        <div className="flex h-80 flex-col gap-8 overflow-hidden rounded-lg bg-white p-8 font-semibold shadow-md">
          <h2 className="text-black">{question.question_title}</h2>
          <div className="flex flex-col gap-6 overflow-auto opacity-60">
            {Object.values(question.question_values).map((option, index) => (
              <div key={index}>
                {Array.isArray(option) ? option[0] : option}
              </div>
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
