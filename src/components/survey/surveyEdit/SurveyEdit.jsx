import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import pencil_edit from "@/assets/pencil_edit.png";

import makeRequest from "@/utils/makeRequest";
import dateConvert from "@/utils/dateConvert";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import ReviewCard from "../reviewSurvey/ReviewCard";
import EditSurveyDetails from "./EditSurveyDetails";
import AddMoreQuestionPop from "./AddMoreQuestionPop";
import PageTitle from "@helperComps/PageTitle";

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

  //Date and time
  const localStartDate = dateConvert(surveyInfo.start_date, "local");
  const localEndDate = dateConvert(surveyInfo.end_date, "local");

  const [startDate, startTime] = localStartDate.split(",");
  const [endDate, endTime] = localEndDate.split(",");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        {/* Survey Info */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <PageTitle name={surveyInfo?.survey_title} />
            <button type="button" onClick={() => setSurveyEditPop(true)}>
              <img src={pencil_edit} alt="Edit Survey" className="w-6" />
            </button>
          </div>

          <span className="font-semibold capitalize">
            {surveyInfo?.category?.category_name}
          </span>

          <div className="flex flex-col gap-1">
            <span className="font-semibold">{`${startDate} - ${endDate}`}</span>
            <span className="font-medium text-[#858585]">{`${startTime} - ${endTime}`}</span>
          </div>

          <div className="flex items-center gap-2 font-semibold capitalize">
            <span> {surveyInfo?.loyalty_point} </span>
            <span className="font-medium">loyalty points</span>
          </div>
        </div>

        {/* Add question button */}
        <button
          className="btn-primary h-fit w-fit"
          onClick={() => setQuestionAddPop(true)}
        >
          <i className="fa-solid fa-plus" />
          Question
        </button>
      </div>

      {!loading ? (
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">About Survey</h1>
          <span>{surveyInfo.survey_description}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-x-28 gap-y-12">
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

      {/* Action Buttons */}
      {!surveyInfo.status.isLive ? (
        <div className="flex justify-center gap-6">
          <button
            type="button"
            className="btn-primary bg-white text-black/50 hover:text-white"
          >
            Publish
          </button>
          <button type="button" className="btn-primary">
            Schedule
          </button>
        </div>
      ) : null}
    </div>
  );
}
