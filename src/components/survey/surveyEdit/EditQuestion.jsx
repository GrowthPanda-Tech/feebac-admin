import { useState } from "react";
import { useParams } from "react-router-dom";

//utils
import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

//components

function Input({ type, name, value, onChange }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-md bg-background px-8 py-5"
      required
    />
  );
}

export default function EditQuestion({
  surveyId,
  questions,
  questionNo,
  setEditPop,
  setQuestionList,
  setSurveyInfo,
}) {
  const { slug } = useParams();

  const [updatedQuestionData, setUpdatedQuestionData] = useState({
    surveyId: surveyId,
    questionId: questions.question_id,
    questionType: questions.question_type?.type_id,
    questionTitle: questions.question_title,
    questionValue: questions.question_values,
  });

  const [options, setOptions] = useState(
    Object.values(updatedQuestionData.questionValue)
  );
  const [activeButtonIndex, setActiveButtonIndex] = useState(
    updatedQuestionData.questionType - 1
  );

  const setQuestionType = (
    index,
    questionType,
    questionValue = updatedQuestionData.questionValue
  ) => {
    setActiveButtonIndex(index);

    if (questionType === 2 || questionType === 3) {
      if (Object.values(questionValue).length === 0) {
        setOptions(["", ""]);
      } else {
        setOptions(Object.values(questionValue));
      }
    }

    setUpdatedQuestionData({
      ...updatedQuestionData,
      questionType,
      questionValue,
    });
  };

  const arrangeOptions = (updatedOptions) => {
    let questionValue = {};
    for (let i = 0; i < updatedOptions.length; i++) {
      questionValue[(i + 1).toString()] = updatedOptions[i];
    }
    setUpdatedQuestionData({ ...updatedQuestionData, questionValue });
  };

  const handleInputChange = (e) =>
    setUpdatedQuestionData({
      ...updatedQuestionData,
      [e.target.name]: e.target.value,
    });

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);

    arrangeOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    arrangeOptions(updatedOptions);
  };

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await makeRequest(
        "survey/update-question",
        "PUT",
        updatedQuestionData
      );

      if (response.isSuccess) {
        swal("success", response.message);
        const getData = async () => {
          const response = await makeRequest(`survey/show-survey?sid=${slug}`);

          if (response.isSuccess) {
            setQuestionList(response.questionList);
            setSurveyInfo(response.surveyInfo);
            setEditPop(false);
          }
        };

        getData();
      } else {
        swal("error", response.message);
      }
    } catch (error) {
      if (error >= 500) swal("error", "Something went wrong!!");
    }
  };

  return (
    <form onSubmit={handleQuestionSubmit}>
      <div className="flex w-[50vw] flex-col gap-8 rounded-xl bg-white px-8 py-12">
        <label className="flex flex-col gap-2">
          <span className="font-bold">Question {questionNo + 1} :</span>
          <Input
            type={"text"}
            name={"questionTitle"}
            onChange={(e) => handleInputChange(e)}
            value={updatedQuestionData ? updatedQuestionData.questionTitle : ""}
          />
        </label>
        <div className="flex w-full items-center justify-between">
          <div className="flex h-fit gap-7">
            <button
              type="button"
              className={`pill ${
                activeButtonIndex === 0 ? "pill-primary" : "pill-secondary"
              }`}
              onClick={() => setQuestionType(0, 1, {})}
            >
              Text Answer
            </button>
            <button
              type="button"
              className={`pill ${
                activeButtonIndex === 1 ? "pill-primary" : "pill-secondary"
              }`}
              onClick={() => setQuestionType(1, 2)}
            >
              One Answer
            </button>
            <button
              type="button"
              className={`pill ${
                activeButtonIndex === 2 ? "pill-primary" : "pill-secondary"
              }`}
              onClick={() => setQuestionType(2, 3)}
            >
              Multiple Answer
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {updatedQuestionData.questionType === 1 ? (
            <></>
          ) : (
            options.map((option, index) => (
              <div key={index} className="flex items-center justify-between">
                <Input
                  type={"text"}
                  name={"questionValue"}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />

                {options.length <= 2 ? (
                  <></>
                ) : (
                  <button
                    type="button"
                    className="ml-6"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <i className="fa-regular fa-trash-can text-xl text-black"></i>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between">
          {updatedQuestionData.questionType !== 1 ? (
            <button
              type="button"
              onClick={() => setOptions([...options, ""])}
              className="btn-primary w-fit border border-grey bg-white text-black hover:bg-secondary hover:text-white"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Options</span>
            </button>
          ) : null}

          <div className="flex gap-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditPop(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary w-fit">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
