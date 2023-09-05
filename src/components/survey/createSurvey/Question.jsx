import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";
import { Link } from "react-router-dom";

export default function Question({ surveyId, surveyTitle }) {
    //TODO: REFACTOR THIS ASAP
    const [options, setOptions] = useState(["", ""]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionData, setQuestionData] = useState({
        surveyId: surveyId,
        questionType: 2,
    });

    const [activeButtonIndex, setActiveButtonIndex] = useState(1);

    const setQuestionType = (index, questionType, questionValue = {}) => {
        setActiveButtonIndex(index);
        setQuestionData({ ...questionData, questionType, questionValue });
    };

    const arrangeOptions = (updatedOptions) => {
        let questionValue = {};
        for (let i = 0; i < updatedOptions.length; i++) {
            questionValue[(i + 1).toString()] = updatedOptions[i];
        }
        setQuestionData({ ...questionData, questionValue });
    };

    const handleInputChange = (e) =>
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);

        //does this hamper performance
        arrangeOptions(updatedOptions);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        arrangeOptions(updatedOptions);
    };

    const handleQuestionSubmit = async () => {
        const response = await makeRequest(
            "survey/add-question",
            "POST",
            questionData
        );
        alert(response.message);
        setQuestionNumber(questionNumber + 1);
    };

    // const handlePublish = async () => {
    //     const body = {
    //         surveyId,
    //         isStartNow: true,
    //     };
    //     const response = await makeRequest(
    //         "survey/start-survey",
    //         "PATCH",
    //         body
    //     );
    //     alert(response.message);
    //     location.replace("/survey");
    // };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="heading mb-0"> {surveyTitle} </h1>
                <div className="flex gap-4">
                    <button
                        className="btn-primary bg-accent w-fit"
                        onClick={handleQuestionSubmit}
                    >
                        Submit Question
                    </button>

                    {/* <button */}
                    {/*     className="btn-primary w-fit" */}
                    {/*     onClick={handlePublish} */}
                    {/* > */}
                    {/*     Publish Now */}
                    {/* </button> */}

                    <Link to={`/survey/review/${surveyId}`}>
                        <button className="btn-primary w-fit">Review</button>
                    </Link>
                </div>
            </div>
            <label>
                <span className="font-bold"> Question {questionNumber} : </span>
                <input
                    type="text"
                    className="w-full mb-4 input-primary"
                    name="questionTitle"
                    onChange={handleInputChange}
                />
            </label>
            <div className="flex justify-between">
                <div className="flex gap-7">
                    <button
                        className={`pill ${
                            activeButtonIndex === 0
                                ? "pill-primary"
                                : "pill-secondary"
                        }`}
                        onClick={() => setQuestionType(0, 1, {})}
                    >
                        Text Answer
                    </button>
                    <button
                        className={`pill ${
                            activeButtonIndex === 1
                                ? "pill-primary"
                                : "pill-secondary"
                        }`}
                        onClick={() => setQuestionType(1, 2)}
                    >
                        One Answer
                    </button>
                    <button
                        className={`pill ${
                            activeButtonIndex === 2
                                ? "pill-primary"
                                : "pill-secondary"
                        }`}
                        onClick={() => setQuestionType(2, 3)}
                    >
                        Multiple Answer
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                {questionData.questionType === 1 ? (
                    <></>
                ) : (
                    options.map((option, index) => (
                        <div
                            key={index}
                            className="mt-2 flex items-center justify-between"
                        >
                            <input
                                type="text"
                                className="w-full input-primary"
                                name="questionValue"
                                value={option}
                                onChange={(e) => handleOptionChange(e, index)}
                            />

                            {options.length <= 2 ? (
                                <></>
                            ) : (
                                <button
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
            <button
                onClick={() => setOptions([...options, ""])}
                className="btn-primary w-fit"
            >
                <i className="fa-solid fa-plus"></i>
                <span>Add Options</span>
            </button>
        </div>
    );
}
