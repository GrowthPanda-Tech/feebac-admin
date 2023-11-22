import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import makeRequest from "../../utils/makeRequest";
import downloadImg from "../../assets/download.svg";

import Response from "./Response";
import PrimaryButton from "../PrimaryButton";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SurveyInfo() {
  const { slug } = useParams();
  const [surveyInfo, setSurveyInfo] = useState({
    surveyData: {
      survey_title: "",
      total_response: null,
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
      `survey/get-survey-result?surveyId=${slug}`
    );
    setSurveyInfo(response);
  };

  useEffect(() => {
    getSurveyData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
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
        <div className="flex gap-2">
          <Link to={`/content/create-content/${slug}`}>
            <button className="py-3 px-8 bg-secondary hover:bg-primary transition text-white text-lg font-semibold flex items-center gap-2 rounded-md">
              Create Survey Article
            </button>
          </Link>
          <PrimaryButton name={"Export"} handleClick={handleClick}>
            <img src={downloadImg} />
          </PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {surveyInfo.data.map((question, index) => (
          <Response key={index} index={index} question={question} />
        ))}
      </div>
    </div>
  );
}
