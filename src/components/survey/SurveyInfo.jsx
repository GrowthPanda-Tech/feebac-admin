import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

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
        <div className="p-14">
            <div className="mb-8 flex items-center">
                <h1 className="text-2xl font-semibold mr-4">
                    {surveyInfo.surveyData.survey_title} 
                </h1>
                <span className="text-[#A43948] font-semibold">
                    {surveyInfo.surveyData.total_response} Response{surveyInfo.surveyData.total_response!=1?"s":""}
                </span>
            </div>
            <div className="grid grid-cols-4 gap-12">
                {
                    surveyInfo.data.map((survey, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="capitalize text-secondary font-semibold">
                                Question {index + 1} ({survey.questionType})
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md border border-[#A6ACBE] h-full">
                                <div className="text-lg font-semibold leading-snug mb-8"> {survey.questionTitle} </div>
                                <div className="gap-4">
                                    {
                                        survey.options.map((option, index) => (
                                            <div key={index}>
                                                <div className="mt-4 flex justify-between font-bold">
                                                    {option[1]}
                                                    <span className="font-normal"> { option[2] ? option[2] : 0 }% </span>
                                                </div>

                                                {/* Progress bar */}
                                                <div
                                                    className="h-2 bg-[#EA525F] rounded-full"
                                                    style={{ width: `${ option[2] ? Math.floor(option[2]) : 0 }%` }}>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
