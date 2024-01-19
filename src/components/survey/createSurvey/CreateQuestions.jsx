import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "@/contexts/FilterContext";

import swal from "@/utils/swal";
import makeRequest from "@/utils/makeRequest";
import optionIcon from "@/assets/option-preview.png";

import PageTitle from "@helperComps/PageTitle";
import TertFilterCreate from "@utilComps/TertFilterCreate";

function Select({ value, isChecked, name, handleChange, children }) {
  return (
    <div
      className={`flex items-center rounded-md border border-[#C9C9C9] bg-background ${
        !isChecked && "opacity-50"
      }`}
    >
      <select
        className="appearance-none px-3 py-2 outline-0"
        value={value}
        disabled={!isChecked}
        name={name}
        onChange={handleChange}
      >
        {children}
      </select>
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
      className="w-full rounded-md bg-background px-8 py-5 disabled:cursor-not-allowed"
      disabled={disabled}
      required
    />
  );
}

const INIT_OPTIONS = ["", ""];

export default function CreateQuestions({ surveyId, surveyTitle }) {
  const navigate = useNavigate();

  const { fetchedData } = useContext(FilterContext);

  //can't be declared outside
  const INIT_QUESTION = useMemo(
    () => ({ surveyId, questionTitle: "", questionType: 2 }),
    [surveyId],
  );

  const [options, setOptions] = useState(INIT_OPTIONS);
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState(INIT_QUESTION);
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);
  const [filters, setFilters] = useState(fetchedData.data[2].key);
  const [activeFilterIdx, setActiveFilterIdx] = useState(null);
  const [inputType, setInputType] = useState(1);
  const [previewImages, setPreviewImages] = useState([null]);
  const [isChecked, setIsChecked] = useState(false);
  const [isFilterCreate, setIsFilterCreate] = useState(false);

  const [loading, setLoading] = useState({
    publish: false,
    schedule: false,
    save: false,
  });

  const resetState = () => {
    setOptions(INIT_OPTIONS);
    setPreviewImages([null]);
  };

  const setQuestionType = (index, questionType, questionValue) => {
    setActiveButtonIndex(index);
    // setIsChecked(false);

    if (questionValue) {
      const updatedQuestionData = { ...questionData };
      updatedQuestionData.questionValue = {};
      setQuestionData({ ...updatedQuestionData, questionType });
      setOptions(INIT_OPTIONS);
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

      if (Array.isArray(answerVal)) {
        answerVal[1] = value;
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
    event.preventDefault();

    const file = event.target.files[0];
    const name = event.target.name;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await makeRequest(
        "survey/upload-option-image",
        "POST",
        formData,
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
      return;
    }

    //TODO: manage state to reset filter dropdown values
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    arrangeOptions(updatedOptions);
  };

  const handleQuestionSubmit = async () => {
    setIsChecked(false);
    setLoading({ ...loading, save: true });

    try {
      const response = await makeRequest(
        "survey/add-question",
        "POST",
        questionData,
      );

      if (!response.isSuccess) throw new Error(response.message);

      setOptions(INIT_OPTIONS);
      setQuestionData(INIT_QUESTION);
      setActiveButtonIndex(1);
      getQuestions();

      swal("success", response.message);
    } catch (error) {
      let message = error.message;
      if (error.message >= 500) message = "Something went wrong!!";

      swal("error", message);
    } finally {
      resetState();
      setInputType(1);
      setLoading({ ...loading, save: false });
    }
  };

  const handlePublish = async (type) => {
    const request = { surveyId };

    switch (type) {
      case "publish":
        request.isStartNow = true;
        break;

      case "schedule":
        request.isStartNow = false;
        break;

      default:
        throw new Error("Invalid publish type!!");
    }

    setLoading({ ...loading, [type]: true });

    try {
      const response = await makeRequest(
        "survey/start-survey",
        "PATCH",
        request,
      );

      if (!response.isSuccess) throw new Error(response.message);

      swal("success", response.message);
      navigate("/survey");
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  const getQuestions = async () => {
    try {
      const response = await makeRequest(`survey/show-survey?sid=${surveyId}`);

      if (!response.isSuccess) throw new Error(response.message);

      setQuestions(response.questionList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <PageTitle name={surveyTitle} />
        <div className="flex gap-4">
          <button
            className="btn-primary disabled:btn-secondary w-fit disabled:cursor-not-allowed"
            onClick={() => handlePublish("publish")}
            disabled={loading.publish || loading.schedule}
          >
            {loading.publish ? "Publishing..." : "Publish"}
          </button>

          <button
            className={`btn-primary disabled:btn-secondary w-fit bg-tertiary disabled:cursor-not-allowed`}
            onClick={() => handlePublish("schedule")}
            disabled={loading.schedule || loading.publish}
          >
            {loading.schedule ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>

      <form onSubmit={handleQuestionSubmit}>
        <div className="flex flex-col gap-4 rounded-xl bg-white px-8 py-12">
          <div className="flex items-center justify-end gap-12">
            <button
              type="button"
              className="text-lg font-medium text-[#EA525F]"
              onClick={() => setIsFilterCreate(true)}
            >
              Create Filter
            </button>
            <div className="flex items-center gap-4">
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
              >
                <option value="" selected disabled hidden>
                  Select Tertiary Filter
                </option>
                {filters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.key_name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <label className="flex flex-col gap-4">
            <span className="font-bold">
              {`Question ${questions.length + 1} :`}
            </span>
            <Input
              type={"text"}
              name={"questionTitle"}
              onChange={handleChange}
              value={questionData.questionTitle}
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
                  className="flex items-center justify-between gap-8"
                >
                  {inputType == 1 && (
                    <Input
                      type="text"
                      name="questionValue"
                      value={Array.isArray(option) ? option[0] : option}
                      onChange={(event) => handleChange(event, index)}
                    />
                  )}

                  {inputType == 3 || inputType == 2 ? (
                    <div className="relative">
                      {previewImages[index] ? (
                        <img
                          src={previewImages[index]}
                          className="h-32 w-32"
                          alt={`Selected Image Preview ${index}`}
                        />
                      ) : (
                        <img
                          src={optionIcon}
                          className="h-32 w-32"
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
                        onChange={(event) => handleImageChange(event, index)}
                      />
                      <Input
                        type="text"
                        name="imgAndText"
                        value={Array.isArray(option) ? option[0] : option}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </>
                  )}

                  {isChecked ? (
                    <Select
                      isChecked={isChecked}
                      handleChange={(event) => handleChange(event, index)}
                      name={"keywords"}
                    >
                      <option value="" disabled selected hidden>
                        Keywords
                      </option>
                      {filters[activeFilterIdx]?.options?.map(
                        (filter, index) => (
                          <option key={index}>{filter}</option>
                        ),
                      )}
                    </Select>
                  ) : null}

                  {options.length <= 2 ? (
                    <></>
                  ) : (
                    <button onClick={() => handleRemoveOption(index)}>
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
                type="button"
                onClick={() => setOptions([...options, ""])}
                className="btn-primary w-fit border border-grey bg-white text-black hover:bg-secondary hover:text-white"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add Options</span>
              </button>
            ) : null}

            <button
              type="submit"
              className="btn-primary disabled:btn-secondary w-fit"
              onClick={handleQuestionSubmit}
              disabled={loading.save}
            >
              {loading.save ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex flex-col gap-8 rounded-xl bg-white px-8 py-12"
          >
            <span className="font-bold">Question {index + 1} :</span>
            <Input type={"text"} value={question.question_title} disabled />
            <div className="flex flex-col gap-4">
              {Object.values(question.question_values).map((value, index) => (
                <div key={index} className="flex items-center gap-4">
                  {question.question_type.type_id === 2 ? (
                    <input type="radio" className="h-4 w-4" disabled />
                  ) : question.question_type.type_id === 3 ? (
                    <input type="checkbox" className="h-4 w-4" disabled />
                  ) : (
                    <></>
                  )}
                  <Input
                    value={Array.isArray(value) ? value[0] : value}
                    disabled
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isFilterCreate ? (
        <div
          className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center`}
          onClick={() => setIsFilterCreate(false)}
        >
          <TertFilterCreate
            stopPropgation={(e) => e.stopPropagation()}
            setIsFilterCreate={setIsFilterCreate}
            setFilters={setFilters}
          />
        </div>
      ) : null}
    </div>
  );
}
