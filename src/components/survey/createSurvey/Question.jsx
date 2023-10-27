import { useState, useEffect } from "react";
import makeRequest from "../../../utils/makeRequest";
import { Link, useParams } from "react-router-dom";
import downArrow from "../../../assets/iconamoon_arrow-down-2-light.svg";
import AlertComponent from "../../AlertComponent/AlertComponent";

function Input({ type, name, value, onChange, disabled }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-background py-5 px-8 rounded-md disabled:cursor-not-allowed"
            disabled={disabled}
        />
    );
}

export default function Question({
    surveyId,
    surveyTitle,
    editAdd,
    surveyInfo,
    setQuestionAddPop,
    setQuestionList,
    setSurveyInfo,
}) {
    const { slug } = useParams();

    const [options, setOptions] = useState(["", ""]);
    const [questionNumber, setQuestionNumber] = useState(
        editAdd ? surveyInfo?.totalQuestions + 1 : 1
    );
    const [questionData, setQuestionData] = useState({
        surveyId: surveyId,
        questionType: 2,
    });

    const [activeButtonIndex, setActiveButtonIndex] = useState(1);
    const [filters, setFilters] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const [questions, setQuestions] = useState([]);

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
        if (editAdd) {
            try {
                const response = await makeRequest(
                    "survey/add-question",
                    "POST",
                    questionData
                );
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
                } else AlertComponent("failed", response);

                setQuestionAddPop(false);
            } catch (error) {
                AlertComponent("error", "", "Server Error");
            }
        } else {
            try {
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
            } catch (error) {
                AlertComponent("error", "", "Server Error");
            }
        }
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

    useEffect(() => {
        getFilters();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
                {!editAdd && <h1 className="heading mb-0"> {surveyTitle} </h1>}
                <div className="flex gap-4">
                    {/* <button
                        className="btn-primary w-fit"
                        onClick={handlePublish}
                    >
                        Publish Now
                    </button> */}

                    {!editAdd && (
                        <Link to={`/survey/review/${surveyId}`}>
                            <button className="btn-primary w-fit">
                                Review
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {!editAdd && (
                <div className="flex flex-col gap-12">
                    {questions &&
                        questions.map((question, index) => (
                            <div
                                key={index}
                                className="bg-white px-8 py-12 rounded-xl flex flex-col gap-8"
                            >
                                <span className="font-bold">
                                    Question {index + 1} :
                                </span>
                                <Input
                                    type={"text"}
                                    value={question.questionTitle}
                                    disabled
                                />
                                <div className="flex flex-col gap-4">
                                    {Object.values(question.questionValue).map(
                                        (value, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4"
                                            >
                                                {question.questionType === 2 ? (
                                                    <input
                                                        type="radio"
                                                        className="w-4 h-4"
                                                        disabled
                                                    />
                                                ) : question.questionType ===
                                                  3 ? (
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4"
                                                        disabled
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                                <Input value={value} disabled />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <div className="bg-white px-8 py-12 rounded-xl flex flex-col gap-8 w-[50vw]">
                <label className="flex flex-col gap-2">
                    <span className="font-bold">
                        Question{" "}
                        {editAdd
                            ? surveyInfo?.totalQuestions + 1
                            : questionNumber}{" "}
                        :
                    </span>
                    <Input
                        type={"text"}
                        name={"questionTitle"}
                        onChange={handleInputChange}
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
                    {questionData.questionType === 1 ? (
                        <></>
                    ) : (
                        options.map((option, index) => (
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

                    <div className="flex gap-3">
                        <button
                            className="btn-primary w-fit"
                            onClick={handleQuestionSubmit}
                        >
                            Save
                        </button>
                        {editAdd && (
                            <button
                                className="btn-secondary w-fit"
                                onClick={() => {
                                    setQuestionAddPop(false);
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
