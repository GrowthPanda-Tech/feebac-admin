import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../../../utils/makeRequest";
import ReviewCard from "../reviewSurvey/ReviewCard";
import EditSurveyDetails from "./EditSurveyDetails";
import AddMoreQuestionPop from "./AddMoreQuestionPop";
import ToggleButton from "./ToogleButton";

function InputHeading({ title, value }) {
    return (
        <div className="grid grid-cols-2 md:w-3/4">
            <h1 className=" text-xl font-semibold">{title} : </h1>
            <span className="text-xl font-semibold">{value}</span>
        </div>
    );
}

export default function SurveyEdit() {
    const { slug } = useParams();
    const [surveyInfo, setSurveyInfo] = useState({});
    const [questionList, setQuestionList] = useState([]);
    const [surveyId, setSurveyId] = useState(surveyInfo.survey_id);
    const [surveyEditPop, setSurveyEditPop] = useState(false);
    const [questionAddPop, setQuestionAddPop] = useState(false);

    const convertToLocal = (date) => {
        const dateObj = new Date(`${date} UTC`);
        return dateObj.toLocaleString();
    };

    const getData = async () => {
        const response = await makeRequest(
            `survey/show-survey?sid=${slug}`,
            "GET"
        );
        if (response.isSuccess) {
            setSurveyInfo(response.surveyInfo);
            setQuestionList(response.questionList);
            setSurveyId(response.surveyInfo.survey_id);
        }
    };

    useEffect(() => {
        getData();
    }, [slug]);

    console.log(surveyInfo);

    return (
        <>
            {surveyInfo && (
                <div className="flex justify-between ">
                    <div className="flex flex-col md:w-1/2 gap-6">
                        {surveyInfo && (
                            <div className="">
                                <InputHeading
                                    title={"Survey Title"}
                                    value={surveyInfo?.survey_title}
                                />

                                <InputHeading
                                    title={"Start Date & Time"}
                                    value={
                                        surveyInfo
                                            ? convertToLocal(
                                                  surveyInfo.start_date
                                              ).split(",")[0] +
                                              convertToLocal(
                                                  surveyInfo.start_date
                                              ).split(",")[1]
                                            : ""
                                    }
                                />
                                <InputHeading
                                    title={"End Date & Time"}
                                    value={
                                        surveyInfo
                                            ? convertToLocal(
                                                  surveyInfo.end_date
                                              ).split(",")[0] +
                                              convertToLocal(
                                                  surveyInfo.end_date
                                              ).split(",")[1]
                                            : ""
                                    }
                                />
                                <InputHeading
                                    title={"Total Question"}
                                    value={surveyInfo?.totalQuestions}
                                />
                            </div>
                        )}

                        <div className="flex w-full">
                            <p>{surveyInfo && surveyInfo.survey_description}</p>
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-4">
                        <ToggleButton
                            surveyInfo={surveyInfo}
                            surveyId={surveyId}
                        />
                        <button
                            className="btn-primary "
                            onClick={() => {
                                setSurveyEditPop(true);
                            }}
                        >
                            Edit Survey Details
                        </button>
                        <button
                            className="btn-primary "
                            onClick={() => {
                                setQuestionAddPop(true);
                            }}
                        >
                            Add New Question?
                        </button>
                    </div>
                </div>
            )}

            {surveyInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {questionList &&
                        questionList.map((question, index) => (
                            <ReviewCard
                                key={index}
                                index={index}
                                question={question}
                                isEdit={true}
                                surveyId={surveyId}
                                setSurveyInfo={setSurveyInfo}
                                setQuestionList={setQuestionList}
                                questionList={questionList}
                            />
                        ))}
                </div>
            )}
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
        </>
    );
}
