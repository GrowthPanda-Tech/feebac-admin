import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import Response from "./Response";
import PrimaryButton from "../PrimaryButton";

import downloadImg from "../../assets/download.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SurveyInfo() {
    const { slug } = useParams();
    const [surveyInfo, setSurveyInfo] = useState({
        surveyData: {
            survey_title: "",
            total_response: undefined,
        },
        data: [],
    });

    const request = {
        headers: {
            authToken: localStorage.getItem("authToken"),
        },
    };

    const handleClick = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/site-admin/download-response?surveyId=${slug}`,
                request
            );

            if (response.status >= 500) {
                throw new Error(response.status);
            }

            const blob = await response.blob();

            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = `${slug}.xlsx`;
            a.click();
        } catch (error) {
            console.error(error);
        }
    };

    const getSurveyData = async () => {
        const response = await makeRequest(
            `survey/get-survey-result?surveyId=${slug}`,
            "GET"
        );
        setSurveyInfo(response);
    };
    useEffect(() => {
        getSurveyData();
    }, []);

    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">
                        {surveyInfo.surveyData.survey_title}
                    </h1>
                    <span className="text-[#A43948] font-semibold">
                        {surveyInfo.surveyData.total_response} Complete Response
                        {surveyInfo.surveyData.total_response != 1 ? "s" : ""}
                    </span>
                </div>
                <PrimaryButton name={"Export"} handleClick={handleClick}>
                    <img src={downloadImg} />
                </PrimaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 h-[60vh] overflow-y-scroll p-5">
                {surveyInfo.data.map((question, index) => (
                    <Response key={index} index={index} question={question} />
                ))}
            </div>
        </>
    );
}
