import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../../../utils/makeRequest";
import SurveyDetails from "./SurveyDetails.jsx";

export default function SurveyReview() {
    const { slug } = useParams();
    const [surveyInfo, setSurveyInfo] = useState({});
    const [questionList, setQuestionList] = useState([]);

    const getData = async () => {
        const response = await makeRequest(
            `survey/show-survey?sid=${slug}`,
            "GET"
        );
        if (response.isSuccess) {
            setSurveyInfo(response.surveyInfo);
            setQuestionList(response.questionList);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            {/* <SurveyDetails info={surveyInfo} /> */}
            {/* <QuestionList info={questionList} /> */}
        </div>
    );
}
