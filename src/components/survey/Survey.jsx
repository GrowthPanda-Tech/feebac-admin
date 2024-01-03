import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

import Table from "../__helperComponents__/table/Table";
import Thead from "../__helperComponents__/table/Thead";
import Trow from "../__helperComponents__/table/Trow";
import Tdata from "../__helperComponents__/table/Tdata";
import TableDateTime from "../__helperComponents__/table/TableDateTime";

import LoadingSpinner from "../__helperComponents__/LoadingSpinner";
import PageTitle from "../__helperComponents__/PageTitle";
import Pagination from "../__helperComponents__/Pagination";
import PaginationSelect from "../__helperComponents__/PaginationSelect";

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
    </div>
  );
}

export default function Survey() {
  const [surveyData, setsurveyData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("live");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      setsurveyData(updatedData);

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
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/site-admin/get-all-survey?time=${status}&query=${searchQuery}&page=${page}&count=${itemsPerPage}`,
          request,
        );

        if (response.status >= 500 || response.status === 204) {
          throw new Error(response.status);
        }

        const json = await response.json();

        if (!json.isSuccess) {
          throw new Error(json.message);
        }

        setsurveyData(json.data);
        setTotalItems(json.totalCount);

        setLoading(false);
      } catch (error) {
        if (error.message == 204) {
          setsurveyData([]);
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
        <PageTitle name={"Survey List"} />
        <Link to={"/survey/create"} className="w-fit">
          <button className="btn-primary">
            <i className="fa-solid fa-plus"></i>
            Create a Survey
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

      <div className=" h-[60vh] overflow-y-scroll bg-white">
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
                        <span className=" chip-green">Public</span>
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
                                  <i className="fa-solid fa-square-poll-horizontal text-xl"></i>
                                </Link>
                                <span className="tool-tip-span -right-[3.4rem] -top-12 bg-black ">
                                  View Response
                                  <span className="tooltip-arrow bottom-[-2px] left-[45%]"></span>
                                </span>
                              </div>
                              <div className="tool-tip-div group">
                                <i
                                  className={`fa-regular fa-newspaper text-xl ${
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
                                      className={`fa-solid ${
                                        is_public ? "fa-eye-slash" : "fa-eye"
                                      } `}
                                    ></i>
                                  </button>
                                  <span className="tool-tip-span  -right-[2.8rem] -top-12 bg-black ">
                                    {is_public ? "Make Private" : "Make Public"}
                                    <span className="tooltip-arrow bottom-[-2px] left-[50%]"></span>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        {status === "upcoming" ? (
                          <div className="flex justify-center gap-4">
                            <div className="flex justify-center">
                              <div className="tool-tip-div group">
                                <Link to={`edit-survey/${survey_id}`}>
                                  <i className="fa-solid fa-pen-to-square text-xl"></i>
                                </Link>
                                <span className="tool-tip-span -right-[2.8rem] -top-12 bg-black ">
                                  Edit Survey
                                  <span className="tooltip-arrow bottom-[-2px] left-[38%]"></span>
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <div className="tool-tip-div group">
                                <button
                                  onClick={() => handleSatus(survey_id, index)}
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
