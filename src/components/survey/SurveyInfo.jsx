import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import useFetch from "../../hooks/useFetch";
import downloadImg from "../../assets/download.svg";

import Response from "./Response";
import PrimaryButton from "../__helperComponents__/PrimaryButton";
import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_TOKEN = localStorage.getItem("authToken");

export default function SurveyInfo() {
  const { slug } = useParams();

  const { loading, fetchedData } = useFetch(
    `survey/get-survey-result?surveyId=${slug}`,
  );

  const { surveyData, content, data } = fetchedData || {};

  const [downloading, setDownloading] = useState(false);

  const handleClick = async () => {
    const request = {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    };

    setDownloading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/site-admin/download-response?surveyId=${slug}`,
        request,
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
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">
            {fetchedData?.surveyData.survey_title}
          </h1>
          <span className="font-semibold text-[#A43948]">
            {fetchedData?.surveyData.total_response} Complete Response
            {fetchedData?.surveyData.total_response != 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          {!content ? (
            <Link to={`/content/create-content/${slug}`}>
              <button className="btn-primary bg-accent">Attach Article</button>
            </Link>
          ) : null}
          <button
            className="btn-primary disabled:btn-secondary"
            disabled={downloading}
            onClick={handleClick}
          >
            <i className="fa-solid fa-cloud-arrow-down" />
            {downloading ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>

      {content ? (
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium">Linked Content :</span>
          <span>{content.title}</span>
          <span>({content.type})</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
        {fetchedData?.data.map((question, index) => (
          <Response key={index} index={index} question={question} />
        ))}
      </div>
    </div>
  );
}
