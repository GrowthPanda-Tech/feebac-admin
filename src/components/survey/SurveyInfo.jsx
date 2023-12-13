import { Link, useParams, useLocation } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import downloadImg from "../../assets/download.svg";

import Response from "./Response";
import PrimaryButton from "../_helperComponents/PrimaryButton";
import LoadingSpinner from "../_helperComponents/LoadingSpinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_TOKEN = localStorage.getItem("authToken");

export default function SurveyInfo() {
  const { slug } = useParams();

  const location = useLocation();
  const { from } = location.state;

  const { loading, fetchedData } = useFetch(
    `survey/get-survey-result?surveyId=${slug}`
  );

  const handleClick = async () => {
    const request = {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    };

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">
            {fetchedData?.surveyData.survey_title}
          </h1>
          <span className="text-[#A43948] font-semibold">
            {fetchedData?.surveyData.total_response} Complete Response
            {fetchedData?.surveyData.total_response != 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          {!from ? (
            <Link to={`/content/create-content/${slug}`}>
              <button className="py-3 px-8 bg-secondary hover:bg-primary transition text-white text-lg font-semibold flex items-center gap-2 rounded-md">
                Create Survey Article
              </button>
            </Link>
          ) : null}
          <PrimaryButton name={"Export"} handleClick={handleClick}>
            <img src={downloadImg} />
          </PrimaryButton>
        </div>
      </div>

      {from ? (
        <div className="flex gap-2 items-center">
          <span className="font-medium text-xl">Linked Content :</span>
          <span>{from.title}</span>
          <span>({from.type})</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {fetchedData?.data.map((question, index) => (
          <Response key={index} index={index} question={question} />
        ))}
      </div>
    </div>
  );
}
