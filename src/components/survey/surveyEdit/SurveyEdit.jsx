import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../../../utils/makeRequest";
import ReviewCard from "../reviewSurvey/ReviewCard";

function InputHeading({ title, value }) {
    return (
        <div className="grid grid-cols-2 md:w-3/4">
            <h1 className=" text-xl font-semibold">{title} : </h1>
            <span className="text-xl font-semibold">{value}</span>
        </div>
    );
}

export default function SurveyEdit() {
    const splitDate = (data) => {
        let arr = data;
        console.log(arr);
        const NewDate = arr.split("");
        return NewDate;
    };
    const { slug } = useParams();
    const [surveyInfo, setSurveyInfo] = useState({});
    const [questionList, setQuestionList] = useState([]);
    const [surveyId, setSurveyId] = useState(surveyInfo.survey_id);

    console.log(surveyId);

    const getData = async () => {
        const response = await makeRequest(
            `survey/show-survey?sid=${slug}`,
            "GET"
        );
        if (response.isSuccess) {
            console.log(response);
            setSurveyInfo(response.surveyInfo);
            setQuestionList(response.questionList);
            setSurveyId(response.surveyInfo.survey_id);
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
    //     // location.replace("/survey");
    // };

    useEffect(() => {
        getData();
    }, [slug]);
    console.log(questionList);

    return (
        <>
            <div className="flex ">
                <div className="flex flex-col md:w-1/2 gap-6">
                    {surveyInfo && (
                        <div className="">
                            <InputHeading
                                title={"Survey Title"}
                                value={surveyInfo?.survey_title}
                            />

                            <InputHeading
                                title={"Start Date & Time"}
                                value={surveyInfo.created_date}
                            />
                            <InputHeading
                                title={"End Date & Time"}
                                value={surveyInfo.end_date}
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
            </div>

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
                            />
                        ))}
                </div>
            )}
        </>
    );
}
