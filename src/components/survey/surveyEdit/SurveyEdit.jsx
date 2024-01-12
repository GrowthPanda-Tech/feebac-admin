import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import makeRequest from "@/utils/makeRequest";
import dateConvert from "@/utils/dateConvert";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import ReviewCard from "../reviewSurvey/ReviewCard";
import EditSurveyDetails from "./EditSurveyDetails";
import AddMoreQuestionPop from "./AddMoreQuestionPop";

function InputHeading({ title, value, capitalize }) {
  return (
    <div className="grid grid-cols-2 md:w-3/4">
      <h1 className="text-xl font-semibold">{title} : </h1>
      <span className={`text-xl ${capitalize ? "capitalize" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export default function SurveyEdit() {
  const { slug } = useParams();

  const [surveyInfo, setSurveyInfo] = useState({});
  const [questionList, setQuestionList] = useState([]);

  const [surveyEditPop, setSurveyEditPop] = useState(false);
  const [questionAddPop, setQuestionAddPop] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      setLoading(true);

      try {
        const response = await makeRequest(`survey/show-survey?sid=${slug}`);
        if (!response.isSuccess) throw new Error(response.message);

        if (!ignore) {
          setSurveyInfo(response.surveyInfo);
          setQuestionList(response.questionList);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();

    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col md:w-1/2">
          <InputHeading
            title={"Survey Title"}
            value={surveyInfo.survey_title}
          />
          <InputHeading
            title={"Start Date & Time"}
            value={
              surveyInfo ? dateConvert(surveyInfo.start_date, "local") : null
            }
          />
          <InputHeading
            title={"End Date & Time"}
            value={
              surveyInfo ? dateConvert(surveyInfo.end_date, "local") : null
            }
          />
          <InputHeading
            title={"Total Question(s)"}
            value={surveyInfo.total_questions}
          />
        </div>
        <div className="flex flex-col items-end gap-4">
          {surveyInfo?.status?.isLive ? (
            <div className="flex items-center gap-4">
              <button
                className="btn-primary bg-tertiary"
                onClick={() => setSurveyEditPop(true)}
              >
                Edit Survey Details
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {!loading ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">About Survey</h1>
          <span>{surveyInfo.survey_description}</span>
        </div>
      ) : null}

      <button
        className="btn-primary w-fit"
        onClick={() => setQuestionAddPop(true)}
      >
        <i className="fa-solid fa-plus" />
        Question
      </button>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
        {questionList.map((question, index) => (
          <ReviewCard
            key={index}
            index={index}
            question={question}
            surveyId={slug}
            setSurveyInfo={setSurveyInfo}
            setQuestionList={setQuestionList}
            questionList={questionList}
          />
        ))}
      </div>

      {questionAddPop && (
        <AddMoreQuestionPop
          setQuestionList={setQuestionList}
          surveyInfo={surveyInfo}
          setQuestionAddPop={setQuestionAddPop}
          setSurveyInfo={setSurveyInfo}
        />
      )}

      {surveyEditPop && (
        <EditSurveyDetails
          surveyInfo={surveyInfo}
          setSurveyEditPop={setSurveyEditPop}
          setSurveyInfo={setSurveyInfo}
        />
      )}
    </div>
  );
}
