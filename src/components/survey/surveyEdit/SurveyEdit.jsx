import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import pencil_edit from "@/assets/pencil_edit.png";

import makeRequest from "@/utils/makeRequest";
import dateConvert from "@/utils/dateConvert";
import { surveyActions } from "@/utils/buttonHandlers";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import ReviewCard from "../reviewSurvey/ReviewCard";
import EditSurveyDetails from "./EditSurveyDetails";
import AddMoreQuestionPop from "./AddMoreQuestionPop";
import PageTitle from "@helperComps/PageTitle";

export default function SurveyEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [surveyInfo, setSurveyInfo] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [surveyEditPop, setSurveyEditPop] = useState(false);
  const [questionAddPop, setQuestionAddPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionloader, setActionloader] = useState({
    publish: false,
    schedule: false,
  });

  useEffect(() => {
    let ignore = false;

    async function fetchSurveyData() {
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
        setLoading(false);
      }
    }

    fetchSurveyData();

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

  const currentDate = new Date();
  const surveyStartDate = new Date(surveyInfo.start_date);
  const ahead = currentDate > surveyStartDate;

  return (
    <div className="flex flex-grow flex-col gap-10">
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
            <span> {surveyInfo?.loyalty_point || 0} </span>
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
            isRerun={surveyInfo.is_rerun}
          />
        ))}
      </div>

      {questionAddPop && (
        <AddMoreQuestionPop
          questionNumber={questionList.length}
          surveyId={surveyInfo.survey_id}
          setPop={setQuestionAddPop}
          setQuestionList={setQuestionList}
          isRerun={surveyInfo.is_rerun}
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
      {!surveyInfo?.is_public ? (
        <div className="flex justify-center gap-6 p-6">
          <button
            type="button"
            className="btn-primary disabled:btn-secondary bg-white text-black/50 hover:text-white"
            disabled={actionloader.schedule || actionloader.publish}
            onClick={() =>
              surveyActions({
                type: "publish",
                surveyId: surveyInfo.survey_id,
                setLoading: setActionloader,
                navigate,
              })
            }
          >
            {actionloader.publish ? "Publishing..." : "Publish"}
          </button>
          <button
            type="button"
            className="btn-primary disabled:btn-secondary"
            disabled={actionloader.schedule || actionloader.publish || ahead}
            onClick={() =>
              surveyActions({
                type: "schedule",
                surveyId: surveyInfo.survey_id,
                setLoading: setActionloader,
                navigate,
              })
            }
          >
            {actionloader.schedule ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
