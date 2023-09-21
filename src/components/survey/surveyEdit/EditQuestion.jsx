import { useState, useEffect } from "react";
import makeRequest from "../../../utils/makeRequest";
import { useParams } from "react-router-dom";
import downArrow from "../../../assets/iconamoon_arrow-down-2-light.svg";

function Input({ type, name, value, onChange }) {
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
    setQuestionList,
    questionList,
}) {
    const apiOptions = Object.values(questions[0].question_values);
    const { slug } = useParams();
    const [options, setOptions] = useState(apiOptions);
    const [questionNumber, setQuestionNumber] = useState(questionNo + 1);
    const [updatedQuestionData, setUpdatedQuestionData] = useState({
        surveyId: surveyId,
        questionId: questions[0].question_id,
        questionType: questions[0]?.question_type?.type_id,
        questionTitle: questions[0]?.question_title,
        questionValue: questions[0].question_values,
    });
    const [activeButtonIndex, setActiveButtonIndex] = useState(
        updatedQuestionData.questionType - 1
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

    const setQuestionType = (
        index,
        questionType,
        questionValue = updatedQuestionData.questionValue
    ) => {
        setActiveButtonIndex(index);
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

    const handleQuestionSubmit = async () => {
        const response = await makeRequest(
            "survey/update-question",
            "PUT",
            updatedQuestionData
        );
        alert(response.message);

        setOptions(["", ""]);
        setUpdatedQuestionData({
            surveyId: surveyId,
            questionType: 2,
        });
        setEditPop(false);

        if (response.isSuccess) {
            const getData = async () => {
                const response = await makeRequest(
                    `survey/show-survey?sid=${slug}`,
                    "GET"
                );
                if (response.isSuccess) {
                    setQuestionList(response.questionList);
                }
            };
            getData();
        }
    };
    useEffect(() => {
        getFilters();
        setOptions(apiOptions);
    }, []);
    console.log(updatedQuestionData);

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
                        value={
                            updatedQuestionData
                                ? updatedQuestionData.questionTitle
                                : ""
                        }
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
                </div>
                <div className="flex flex-col gap-4">
                    {updatedQuestionData.questionType === 1 ? (
                        <></>
                    ) : updatedQuestionData.questionType === 4 ? (
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
                    {updatedQuestionData.questionType !== 1 &&
                    updatedQuestionData.questionType !== 4 ? (
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
