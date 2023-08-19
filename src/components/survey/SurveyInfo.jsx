import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import Response from "./Response";

export default function SurveyInfo() {
    const { slug } = useParams();
    const [surveyInfo, setSurveyInfo] = useState({
        surveyData: {
            survey_title: "",
            total_response: undefined,
        },
        data:[],
    });
    
    async function getSurveyData() {
        const response = await makeRequest(`survey/get-survey-result?surveyId=${slug}`, 'GET');
        setSurveyInfo(response);
        console.log(response);
    }
    useEffect(() => {
        getSurveyData();
    }, []);

    return (
        <>
            <div className="mb-8 flex items-center">
                <h1 className="text-2xl font-semibold mr-4">
                    {surveyInfo.surveyData.survey_title} 
                </h1>
                <span className="text-[#A43948] font-semibold">
                    {surveyInfo.surveyData.total_response} Response{surveyInfo.surveyData.total_response !=1 ? "s" : ""}
                </span>
            </div>

            <div className="grid grid-cols-4 gap-12">
                {
                    surveyInfo.data.map((survey, index) => (
                        <Response key={index} index={index} survey={survey} />
                    ))
                }
            </div>
        </>
    )
}
