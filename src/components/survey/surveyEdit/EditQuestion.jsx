import { useState, useEffect } from "react";
import makeRequest from "../../../utils/makeRequest";
import { Link } from "react-router-dom";
import downArrow from "../../../assets/iconamoon_arrow-down-2-light.svg";

function Input({ type, name, value, onChange }) {
    console.log(value);
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-background py-5 px-8 rounded-md"
        />
    );
}

export default function EditQuestion({
    surveyId,
    questions,
    questionNo,
    setEditPop,
}) {
    const [options, setOptions] = useState(["", ""]);
    const [questionNumber, setQuestionNumber] = useState(questionNo + 1);
    const [questionData, setQuestionData] = useState({
        surveyId: surveyId,
        questionType: questions[0]?.question_type?.type_id,
        questionTitle: questions[0]?.question_title,
    });
    const [activeButtonIndex, setActiveButtonIndex] = useState(
        questionData.questionType - 1
    );
    const [filters, setFilters] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const getFilters = async () => {
        const response = await makeRequest(
            "config/get-profile-key-value",
            "GET"
        );
        setFilters(response.data[2].key);
    };

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

        questions.push(questionData);

        setOptions(["", ""]);
        setQuestionData({
            surveyId: surveyId,
            questionType: 2,
        });
        setQuestionNumber(questionNumber + 1);
    };
    const apiOptions = Object.values(questions[0].question_values);
    useEffect(() => {
        getFilters();
        setOptions(apiOptions);
    }, []);
    console.log(options);

    console.log(questions);
    console.log(questions[0].question_title);
    console.log(questionData);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    {/* <button
                        className="btn-primary w-fit"
                        onClick={handlePublish}
                    >
                        Publish Now
                    </button> */}
                </div>
            </div>

            <div className="bg-white px-8 py-12 rounded-xl flex flex-col gap-8">
                <label className="flex flex-col gap-2">
                    <span className="font-bold">
                        Question {questionNumber} :
                    </span>
                    <Input
                        type={"text"}
                        name={"questionTitle"}
                        onChange={handleInputChange}
                        value={questionData ? questionData.questionTitle : ""}
                    />
                </label>
                <div className="flex w-full items-center justify-between">
                    <div className="flex gap-7 h-fit">
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
                        <button
                            className={`pill ${
                                activeButtonIndex === 3
                                    ? "pill-primary"
                                    : "pill-secondary"
                            }`}
                            onClick={() => setQuestionType(3, 4)}
                        >
                            Yes/No Answer
                        </button>
                    </div>
                    <div className="flex items-center gap-6">
                        <input
                            type="checkbox"
                            className="h-6 w-6"
                            onClick={() => setIsDisabled(!isDisabled)}
                        />
                        <div
                            className={`flex bg-background p-4 rounded-md border border-[#C9C9C9] ${
                                isDisabled && "opacity-50"
                            }`}
                        >
                            <select
                                className="appearance-none outline-none"
                                disabled={isDisabled}
                                name="profileField"
                                onChange={(e) =>
                                    setQuestionData({
                                        ...questionData,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                {filters.map((filter) => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.key_name}
                                    </option>
                                ))}
                            </select>
                            <span>
                                <img src={downArrow} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {questionData.questionType === 1 ? (
                        <></>
                    ) : questionData.questionType === 4 ? (
                        <>
                            <Input type={"text"} value={"Yes"} disabled />
                            <Input type={"text"} value={"No"} disabled />
                        </>
                    ) : (
                        Object.values(options).map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between"
                            >
                                <Input
                                    type={"text"}
                                    name={"questionValue"}
                                    value={option}
                                    onChange={(event) =>
                                        handleOptionChange(event, index)
                                    }
                                />

                                {options.length <= 2 ? (
                                    <></>
                                ) : (
                                    <button
                                        className="ml-6"
                                        onClick={() =>
                                            handleRemoveOption(index)
                                        }
                                    >
                                        <i className="fa-regular fa-trash-can text-xl text-black"></i>
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-between">
                    {questionData.questionType !== 1 &&
                    questionData.questionType !== 4 ? (
                        <button
                            onClick={() => setOptions([...options, ""])}
                            className="btn-primary bg-white text-black hover:bg-secondary hover:text-white border border-grey w-fit"
                        >
                            <i className="fa-solid fa-plus"></i>
                            <span>Add Options</span>
                        </button>
                    ) : null}

                    <button
                        className="btn-primary w-fit"
                        onClick={handleQuestionSubmit}
                    >
                        Save
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            setEditPop(false);
                        }}
                    >
                        Cancle
                    </button>
                </div>
            </div>
        </div>
    );
}
