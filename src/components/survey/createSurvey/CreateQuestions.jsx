import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import swal from "../../../utils/swal";
import makeRequest from "../../../utils/makeRequest";
import formSubmit from "../../../utils/formSubmit";
import optionIcon from "../../../assets/option-preview.png";

import PageTitle from "../../PageTitle";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Select({ value, isChecked, name, handleChange, children }) {
    return (
        <div
            className={`flex items-center bg-background rounded-md border border-[#C9C9C9] ${
                !isChecked && "opacity-50"
            }`}
        >
            <select
                className="px-3 py-2 appearance-none outline-0"
                value={value}
                disabled={!isChecked}
                name={name}
                onChange={handleChange}
            >
                {children}
            </select>
            {/* <img src={downArrow} /> */}
        </div>
    );
}

function Input({ type, name, value, onChange, disabled }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-background py-5 px-8 rounded-md disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={null}
        />
    );
}

export default function CreateQuestions({ surveyId, surveyTitle }) {
    const navigate = useNavigate();

    const initOptions = ["", ""];
    const initQuestionData = {
        surveyId,
        questionTitle: "",
        questionType: 2,
    };

    const [options, setOptions] = useState(initOptions);
    const [questions, setQuestions] = useState([]);
    const [questionData, setQuestionData] = useState(initQuestionData);
    const [activeButtonIndex, setActiveButtonIndex] = useState(1);
    const [filters, setFilters] = useState([]);
    const [activeFilterIdx, setActiveFilterIdx] = useState(0);
    const [inputType, setInputType] = useState(1);
    const [previewImages, setPreviewImages] = useState([null]);
    const [isChecked, setIsChecked] = useState(false);

    const request = {
        headers: { authToken: localStorage.getItem("authToken") },
    };

    const getQuestions = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/survey/show-survey?sid=${surveyId}`,
                request
            );

            if (response.status >= 500) {
                throw new Error(response.status);
            }

            const json = await response.json();

            if (!json.isSuccess) {
                throw new Error(response.message);
            }

            setQuestions(json.questionList);
        } catch (error) {
            console.error(error);
        }
    };

    const getFilters = async () => {
        const response = await makeRequest(
            "config/get-profile-key-value",
            "GET"
        );
        setFilters(response.data[2].key);
    };
    const resetState = () => {
        setOptions(initOptions);
        setPreviewImages([null]);
    };
    const setQuestionType = (index, questionType, questionValue) => {
        setActiveButtonIndex(index);
        // setIsChecked(false);

        if (questionValue) {
            const updatedQuestionData = { ...questionData };
            updatedQuestionData.questionValue = {};
            setQuestionData({ ...updatedQuestionData, questionType });
            setOptions(initOptions);
            return;
        }

        setQuestionData({ ...questionData, questionType });
    };

    const arrangeOptions = (options) => {
        let questionValue = {};
        for (let i = 0; i < options.length; i++) {
            questionValue[(i + 1).toString()] = options[i];
        }
        setQuestionData({ ...questionData, questionValue });
    };

    function addValueToNestedArray(arr, index, value) {
        if (index >= 0 && index < arr.length && !arr[index][1].trim()) {
            console.log("hii,hello");
            arr[index][1] = value;
        }
        return arr;
    }

    const handleChange = (event, index) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "questionValue") {
            const updatedOptions = [...options];
            updatedOptions[index] = value;
            setOptions(updatedOptions);
            arrangeOptions(updatedOptions);

            return;
        }

        if (name === "profileField") {
            const idx = event.target.selectedIndex - 1;
            setQuestionData({
                ...questionData,
                profileField: event.target.value,
            });
            setActiveFilterIdx(idx);

            return;
        }

        if (name === "keywords") {
            const updatedOptions = [...options];
            const answerVal = updatedOptions[index];
            if (inputType == 3) {
                updatedOptions[index] = [...answerVal, value];
            } else if (inputType == 2) {
                const imgVal = previewImages[index];
                updatedOptions[index] = [imgVal, value];
            } else {
                updatedOptions[index] = [answerVal, value];
            }
            arrangeOptions(updatedOptions);
            setOptions(updatedOptions);

            return;
        }

        if (name === "imgAndText") {
            const updatedOptions = [...options];
            updatedOptions[index] = previewImages[index]
                ? [value, previewImages[index]]
                : [value, ""];
            arrangeOptions(updatedOptions);
            setOptions(updatedOptions);

            return;
        }

        setQuestionData({ ...questionData, [name]: event.target.value });
    };

    const handleImageChange = async (event, index) => {
        const file = event.target.files[0];
        const name = event.target.name;

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await formSubmit(
                event,
                "survey/upload-option-image",
                "POST",
                formData
            );

            if (response.isSuccess) {
                const imageUrl = response.data;
                const updatedPreviewImages = [...previewImages];
                updatedPreviewImages[index] = imageUrl;
                setPreviewImages(updatedPreviewImages);

                if (name === "onlyImage") {
                    const updatedOption = [...options];
                    updatedOption[index] = imageUrl;
                    setOptions(updatedOption);
                    arrangeOptions(updatedOption);

                    return;
                }
                if (name === "imgAndText") {
                    addValueToNestedArray(options, index, imageUrl);
                }
            } else {
                console.error("Image upload failed");
            }
        } catch (error) {
            console.error("Image upload error:", error);
        }
    };

    const handleClick = () => {
        setIsChecked(!isChecked);

        if (isChecked) {
            const originalOptions = [...options];
            for (let i = 0; i < options.length; i++) {
                if (Array.isArray(options[i])) {
                    if (inputType == 3) {
                        originalOptions[i] = [options[i][0], options[i][1]];
                    } else originalOptions[i] = options[i][0];
                }
            }
            setOptions(originalOptions);
            arrangeOptions(originalOptions);
        }
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        arrangeOptions(updatedOptions);
    };

    const handleQuestionSubmit = async () => {
        setIsChecked(false);

        try {
            const response = await makeRequest(
                "survey/add-question",
                "POST",
                questionData
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            swal("success", response.message);

            setOptions(initOptions);
            setQuestionData(initQuestionData);
            setActiveButtonIndex(1);

            getQuestions();
        } catch (error) {
            if (error.message >= 500) {
                swal("error", "Something has gone wrong");
            } else {
                swal("error", response.message);
            }
        } finally {
            resetState();
            setInputType(1);
        }
    };

    const handleSchedule = async () => {
        try {
            const response = await makeRequest(
                "survey/toggle-survey-status",
                "PATCH",
                { surveyId }
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const customAlert = {
                message: "Survey will start at the scheduled time",
            };

            swal("success", customAlert);
            navigate("/survey");
        } catch (error) {
            console.error(error);
        }
    };

    const handlePublish = async () => {
        const body = {
            surveyId,
            isStartNow: true,
        };
        const response = await makeRequest(
            "survey/start-survey",
            "PATCH",
            body
        );
        if (response.isSuccess) {
            swal("success", response);
            navigate("/survey");
        } else {
            swal("failed", response);
        }
    };

    useEffect(() => {
        getQuestions();
        getFilters();
    }, []);

    console.log(questionData);
    console.log(previewImages);
    console.log(options);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <PageTitle name={surveyTitle} />
                <div className="flex gap-4">
                    <button
                        className="btn-primary w-fit"
                        onClick={handlePublish}
                    >
                        Publish Now
                    </button>

                    <button
                        className="btn-primary bg-tertiary w-fit"
                        onClick={handleSchedule}
                    >
                        Schedule
                    </button>
                </div>
            </div>

            <div className="bg-white px-8 py-12 rounded-xl flex flex-col gap-4">
                <label className="flex flex-col gap-4">
                    <span className="font-bold">
                        Question {questions.length + 1} :
                    </span>
                    <Input
                        type={"text"}
                        name={"questionTitle"}
                        onChange={handleChange}
                        value={questionData.questionTitle}
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

                    <div className="flex items-center gap-4">
                        {!activeButtonIndex == 0 ? (
                            <select
                                name="inputType"
                                className="px-3 py-2 border-2 "
                                onChange={(e) => {
                                    resetState();
                                    setInputType(e.target.value);
                                    setIsChecked(false);
                                }}
                                value={inputType}
                            >
                                <option value={1}>Only Text</option>
                                <option value={2}>Only Image</option>
                                <option value={3}>Both Text and Image</option>
                            </select>
                        ) : (
                            ""
                        )}
                        <input
                            type="checkbox"
                            className="h-6 w-6 accent-secondary"
                            onClick={handleClick}
                            checked={isChecked}
                        />
                        <Select
                            isChecked={isChecked}
                            name={"profileField"}
                            handleChange={handleChange}
                            placeholder={"Profile Key"}
                        >
                            <option value="" selected disabled hidden>
                                Profile Keys
                            </option>
                            {filters.map((filter) => (
                                <option key={filter.id} value={filter.id}>
                                    {filter.key_name}
                                </option>
                            ))}
                        </Select>
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
                        options.map((option, index) => (
                            <div
                                key={index}
                                className="flex gap-8 items-center justify-between"
                            >
                                {inputType == 1 && (
                                    <Input
                                        type="text"
                                        name="questionValue"
                                        value={
                                            Array.isArray(option)
                                                ? option[0]
                                                : option
                                        }
                                        onChange={(event) =>
                                            handleChange(event, index)
                                        }
                                    />
                                )}

                                {inputType == 3 || inputType == 2 ? (
                                    <div className="relative">
                                        {previewImages[index] ? (
                                            <img
                                                src={
                                                    BASE_URL +
                                                    previewImages[index]
                                                }
                                                className="w-32 h-32"
                                                alt={`Selected Image Preview ${index}`}
                                            />
                                        ) : (
                                            <img
                                                src={optionIcon}
                                                className="w-32 h-32"
                                                alt="Default Image"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {inputType == 2 && (
                                    <input
                                        name="onlyImage"
                                        type="file"
                                        className=" absolute w-32 p-12 opacity-0"
                                        accept="image/*"
                                        onChange={(event) => {
                                            handleImageChange(event, index);
                                            handleChange(event, index);
                                        }}
                                    />
                                )}

                                {inputType == 3 && (
                                    <>
                                        <input
                                            type="file"
                                            name="imgAndText"
                                            accept="image/*"
                                            className=" absolute w-28 p-10 opacity-0  "
                                            onChange={(event) =>
                                                handleImageChange(event, index)
                                            }
                                        />
                                        <Input
                                            type="text"
                                            name="imgAndText"
                                            value={
                                                Array.isArray(option)
                                                    ? option[0]
                                                    : option
                                            }
                                            onChange={(event) =>
                                                handleChange(event, index)
                                            }
                                        />
                                    </>
                                )}

                                {isChecked ? (
                                    <Select
                                        // value={""}
                                        isChecked={isChecked}
                                        handleChange={(event) =>
                                            handleChange(event, index)
                                        }
                                        name={"keywords"}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                        >
                                            Keywords
                                        </option>
                                        {filters[activeFilterIdx]
                                            ? filters[
                                                  activeFilterIdx
                                              ].options.map((filter, index) => (
                                                  <option key={index}>
                                                      {filter}
                                                  </option>
                                              ))
                                            : null}
                                    </Select>
                                ) : (
                                    <></>
                                )}

                                {options.length <= 2 ? (
                                    <></>
                                ) : (
                                    <button
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
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className="bg-white px-8 py-12 rounded-xl flex flex-col gap-8"
                    >
                        <span className="font-bold">
                            Question {index + 1} :
                        </span>
                        <Input
                            type={"text"}
                            value={question.question_title}
                            disabled
                        />
                        <div className="flex flex-col gap-4">
                            {Object.values(question.question_values).map(
                                (value, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4"
                                    >
                                        {question.question_type.type_id ===
                                        2 ? (
                                            <input
                                                type="radio"
                                                className="w-4 h-4"
                                                disabled
                                            />
                                        ) : question.question_type.type_id ===
                                          3 ? (
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4"
                                                disabled
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        <Input
                                            value={
                                                Array.isArray(value)
                                                    ? value[0]
                                                    : value
                                            }
                                            disabled
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
