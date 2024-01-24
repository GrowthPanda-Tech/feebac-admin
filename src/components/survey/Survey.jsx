import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

import Table from "@helperComps/table/Table";
import Thead from "@helperComps/table/Thead";
import Trow from "@helperComps/table/Trow";
import Tdata from "@helperComps/table/Tdata";
import TableDateTime from "@helperComps/table/TableDateTime";
import LoadingSpinner from "@helperComps/LoadingSpinner";
import PageTitle from "@helperComps/PageTitle";
import Pagination from "@helperComps/Pagination";
import PaginationSelect from "@helperComps/PaginationSelect";
import SurveyRerun from "../__utilComponents__/SureyRerun";

//assets
import survey_rerun from "@/assets/survey_rerun.svg";
import survey_article from "@/assets/article_linked.svg";
import survey_edit from "@/assets/survey_edit.svg";
import survey_results from "@/assets/survey_results.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const HEADERS = [
  "Title",
  "Category",
  "Start Date",
  "End Date",
  "Status",
  "Actions",
];

function Button({
  type,
  setStatus,
  isActive,
  onClick,
  setPage,
  setSearchQuery,
}) {
  const handleClick = () => {
    setStatus(type);
    setPage(1);
    setSearchQuery("");
    onClick();
  };

  return (
    <button
      className={`capitalize ${isActive ? "pill-primary" : "pill-secondary"}`}
      onClick={handleClick}
    >
      {type}
    </button>
  );
}

function ButtonComponent({ setStatus, setPage, setSearchQuery }) {
  const [activeButton, setactiveButton] = useState(1);
  const handleClick = (buttonId) => setactiveButton(buttonId);

  return (
    <div className="flex gap-4">
      <Button
        type={"live"}
        setPage={setPage}
        setStatus={setStatus}
        setSearchQuery={setSearchQuery}
        isActive={activeButton === 1}
        onClick={() => handleClick(1)}
      />
      <Button
        type={"upcoming"}
        setPage={setPage}
        setSearchQuery={setSearchQuery}
        setStatus={setStatus}
        isActive={activeButton === 2}
        onClick={() => handleClick(2)}
      />
      <Button
        type={"expired"}
        setPage={setPage}
        setSearchQuery={setSearchQuery}
        setStatus={setStatus}
        isActive={activeButton === 3}
        onClick={() => handleClick(3)}
      />
      <Button
        type={"draft"}
        setPage={setPage}
        setSearchQuery={setSearchQuery}
        setStatus={setStatus}
        isActive={activeButton === 4}
        onClick={() => handleClick(4)}
      />
    </div>
  );
}

export default function Survey() {
  const [surveyData, setSurveyData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("live");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [confirmRerun, setConfirmRerun] = useState(false);
  const [rerunInfo, setRerunInfo] = useState({
    survey_id: null,
    table_index: null,
  });

  const handleRerun = (survey_id, table_index) => {
    setConfirmRerun(true);
    setRerunInfo({ survey_id, table_index });
  };

  const handleSatus = async (surveyId, index) => {
    try {
      const response = await makeRequest(
        "survey/toggle-survey-status",
        "PATCH",
        { surveyId },
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      const updatedData = [...surveyData];
      updatedData[index].is_public = !updatedData[index].is_public;
      setSurveyData(updatedData);

      swal("success", response.message);
    } catch (error) {
      swal("error", error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const request = {
      signal,
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    };

    async function fetchSurveyData() {
      setLoading(true);

      try {
        const response = await fetch(
          `${BASE_URL}/site-admin/get-all-survey?type=${status}&query=${searchQuery}&page=${page}&count=${itemsPerPage}`,
          request,
        );

        if (response.status >= 500 || response.status === 204) {
          throw new Error(response.status);
        }

        const json = await response.json();
        if (!json.isSuccess) throw new Error(json.message);

        setSurveyData(json.data);
        setTotalItems(json.totalCount);
        setLoading(false);
      } catch (error) {
        if (error.message == 204) {
          setSurveyData([]);
          setTotalItems(1);
          setLoading(false);
        }
      }
    }

    fetchSurveyData();

    return () => {
      controller.abort();
    };
  }, [status, searchQuery, page, itemsPerPage]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <PageTitle name={"Surveys"} />
        <Link to={"/survey/create"} className="w-fit">
          <button className="btn-primary">
            <i className="fa-solid fa-plus" />
            Create
          </button>
        </Link>
      </div>

      <div className="flex justify-between">
        <ButtonComponent
          setStatus={setStatus}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <input
          type="text"
          className="pill-primary w-1/2 border-0"
          placeholder={`Search in ${status} surveys...`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
        <PaginationSelect
          setItemsPerPage={setItemsPerPage}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="h-[60vh] overflow-y-scroll bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <Thead headers={HEADERS} />
            <tbody>
              {surveyData.map(
                (
                  {
                    survey_id,
                    survey_title,
                    category,
                    start_date,
                    end_date,
                    is_public,
                    content,
                  },
                  index,
                ) => (
                  <Trow key={survey_id}>
                    <Tdata left> {survey_title} </Tdata>
                    <Tdata capitalize> {category.category_name} </Tdata>
                    <Tdata mono>
                      <TableDateTime date={start_date} />
                    </Tdata>
                    <Tdata mono>
                      <TableDateTime date={end_date} />
                    </Tdata>
                    <Tdata>
                      {is_public ? (
                        <span className="chip-green">Public</span>
                      ) : (
                        <span className="chip-red">Private</span>
                      )}
                    </Tdata>
                    <Tdata>
                      <div className="flex justify-center gap-4">
                        {status === "live" || status === "expired" ? (
                          <div className="flex w-full items-center justify-center gap-4">
                            <div className="flex justify-center gap-4">
                              <div className="tool-tip-div group">
                                <Link
                                  to={`details/${survey_id}`}
                                  state={{ from: content }}
                                >
                                  <img
                                    src={survey_results}
                                    alt="survey_results"
                                  />
                                </Link>
                                <span className="tool-tip-span -right-[3.4rem] -top-12 bg-black ">
                                  View Response
                                  <span className="tooltip-arrow bottom-[-2px] left-[45%]" />
                                </span>
                              </div>
                              <div className="tool-tip-div group">
                                <img
                                  src={survey_article}
                                  alt="survey_article"
                                  className={`cursor-pointer ${
                                    !content
                                      ? "cursor-not-allowed opacity-40"
                                      : ""
                                  }`}
                                />
                                <span className="tool-tip-span -right-[3.4rem] -top-12 bg-black">
                                  {content
                                    ? "Article Linked"
                                    : "No article linked"}
                                  <span className="tooltip-arrow bottom-[-2px] left-[30%]"></span>
                                </span>
                              </div>
                            </div>
                            {status === "live" ? (
                              <div className="flex justify-center">
                                <div className="tool-tip-div group">
                                  <button
                                    onClick={() =>
                                      handleSatus(survey_id, index)
                                    }
                                  >
                                    <i
                                      className={`fa-solid text-xl ${
                                        is_public ? "fa-eye-slash" : "fa-eye"
                                      }`}
                                    />
                                  </button>
                                  <span className="tool-tip-span -right-[2.8rem] -top-12 bg-black ">
                                    {is_public ? "Make Private" : "Make Public"}
                                    <span className="tooltip-arrow bottom-[-2px] left-[50%]"></span>
                                  </span>
                                </div>
                              </div>
                            ) : null}
                            {status === "expired" ? (
                              <img
                                src={survey_rerun}
                                alt="survey_rerun"
                                className="cursor-pointer"
                                onClick={() => handleRerun(survey_id, index)}
                              />
                            ) : null}
                          </div>
                        ) : null}
                        {status === "upcoming" || status === "draft" ? (
                          <div className="flex justify-center gap-4">
                            <div className="flex justify-center">
                              <div className="tool-tip-div group">
                                <Link to={`edit-survey/${survey_id}`}>
                                  <img src={survey_edit} alt="survey_edit" />
                                </Link>
                                <span className="tool-tip-span -right-[2.8rem] -top-12 bg-black ">
                                  Edit Survey
                                  <span className="tooltip-arrow bottom-[-2px] left-[38%]"></span>
                                </span>
                              </div>
                            </div>
                            {status !== "draft" ? (
                              <div className="flex justify-center">
                                <div className="tool-tip-div group">
                                  <button
                                    onClick={() =>
                                      handleSatus(survey_id, index)
                                    }
                                  >
                                    <i
                                      className={`fa-regular ${
                                        is_public ? " fa-eye-slash " : "fa-eye"
                                      } `}
                                    ></i>
                                  </button>
                                  <span className="tool-tip-span  -right-[2.8rem] -top-12 bg-black ">
                                    {is_public ? "Make Private" : "Make Public"}
                                    <span className="tooltip-arrow bottom-[-2px] left-[50%]"></span>
                                  </span>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </Tdata>
                  </Trow>
                ),
              )}
            </tbody>
          </Table>
        )}
        {surveyData.length === 0 ? (
          <div className="flex items-center justify-center p-56 opacity-50">
            No Survey Found !!
          </div>
        ) : null}
      </div>

      {/* Re-run survey modal */}
      {confirmRerun ? (
        <SurveyRerun
          setConfirmRerun={setConfirmRerun}
          rerunInfo={rerunInfo}
          setRerunInfo={setRerunInfo}
          setSurveyData={setSurveyData}
        />
      ) : null}

      <Pagination
        page={page}
        setPage={setPage}
        setItemsPerPage={setItemsPerPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </div>
  );
}
