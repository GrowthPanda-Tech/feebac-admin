import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//utils
import makeRequest from "../../../utils/makeRequest";

//components
import AlertComponent from "../../AlertComponent/AlertComponent";

function Input({ type, name, value, onChange }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-background py-5 px-8 rounded-md"
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
    const apiOptions = Object.values(questions[0].question_values);

    const { slug } = useParams();

    const [options, setOptions] = useState(apiOptions);
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
        try {
            const response = await makeRequest(
                "survey/update-question",
                "PUT",
                updatedQuestionData
            );
            setOptions(["", ""]);
            setUpdatedQuestionData({
                surveyId: surveyId,
                questionType: 2,
            });
            setEditPop(false);

            if (response.isSuccess) {
                AlertComponent("success", response);
                const getData = async () => {
                    const response = await makeRequest(
                        `survey/show-survey?sid=${slug}`,
                        "GET"
                    );
                    if (response.isSuccess) {
                        setQuestionList(response.questionList);
                        setSurveyInfo(response.surveyInfo);
                    }
                };
                getData();
            } else {
                AlertComponent("failed", response);
            }
        } catch (error) {
            if (error >= 500)
                AlertComponent("error", "", "Something went wrong!!");
        }
    };
    useEffect(() => {
        setOptions(apiOptions);
    }, []);

    return (
        <form onSubmit={handleQuestionSubmit}>
            <div className="bg-white px-8 py-12 rounded-xl flex flex-col gap-8 w-[50vw]">
                <label className="flex flex-col gap-2">
                    <span className="font-bold">
                        Question {questionNo + 1} :
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
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {updatedQuestionData.questionType === 1 ? (
                        <></>
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

                    <div className="flex gap-4">
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                setEditPop(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="btn-primary w-fit">Save</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
