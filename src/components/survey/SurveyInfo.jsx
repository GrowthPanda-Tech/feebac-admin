import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import useFetch from "@/hooks/useFetch";
import { handleDownload } from "@/utils/buttonHandlers";

import Response from "./Response";
import LoadingSpinner from "@/components/__helperComponents__/LoadingSpinner";

export default function SurveyInfo() {
  const { slug } = useParams();
  const resultRoute = `survey/get-survey-result?surveyId=${slug}`;

  const { loading, fetchedData } = useFetch(resultRoute);
  const { surveyInfo, content, questionList } = fetchedData || {};
  const { survey_title, total_response } = surveyInfo || {};

  //loading state for download button
  const [downloading, setDownloading] = useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">{survey_title}</h1>
          <span className="font-semibold text-[#A43948]">
            {total_response} Complete Response
            {total_response != 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          {!content ? (
            <Link to={`/content/create-content/${slug}`}>
              <button className="btn-primary h-fit whitespace-nowrap bg-accent">
                Attach Article
              </button>
            </Link>
          ) : null}
          <button
            className="btn-primary disabled:btn-secondary h-fit"
            disabled={downloading}
            onClick={() =>
              handleDownload({ id: slug, setLoading: setDownloading })
            }
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

      <div className="grid grid-cols-1 gap-20 py-12 md:grid-cols-2 lg:grid-cols-3">
        {questionList?.map((question, index) => (
          <Response key={index} index={index} question={question} />
        ))}
      </div>
    </div>
  );
}
