import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import PageTitle from "../PageTitle";
import makeRequest from "../../utils/makeRequest";

//assets
import edit from "../../assets/edit.svg";
import Pagination from "../Pagination";
import PaginationSelect from "../PaginationSelect";

const HEADERS = ["Title", "Category", "Start Date", "End Date", "Actions"];

function Button({ type, setStatus, isActive, onClick, setPage }) {
    const handleClick = () => {
        setStatus(type);
        setPage(1);
        onClick();
    };

    return (
        <button
            className={`capitalize ${
                isActive ? "pill-primary" : "pill-secondary"
            }`}
            onClick={handleClick}
        >
            {type}
        </button>
    );
}

function ButtonComponent({ setStatus, setPage }) {
    const [activeButton, setactiveButton] = useState(1);
    const handleClick = (buttonId) => setactiveButton(buttonId);

    return (
        <div className="flex gap-4">
            <Button
                type={"live"}
                setPage={setPage}
                setStatus={setStatus}
                isActive={activeButton === 1}
                onClick={() => handleClick(1)}
            />
            <Button
                type={"upcoming"}
                setPage={setPage}
                setStatus={setStatus}
                isActive={activeButton === 2}
                onClick={() => handleClick(2)}
            />
            <Button
                type={"expired"}
                setPage={setPage}
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
    const [filteredSurveyData, setFilteredSurveyData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const convertToLocal = (date) => {
        const dateObj = new Date(`${date} UTC`);
        return dateObj.toLocaleString();
    };

    useEffect(() => {
        let ignore = false;

        async function fetchSurveyData() {
            try {
                const response = await makeRequest(
                    `site-admin/get-all-survey?time=${status}&query=${searchQuery}&page=${page}&count=${itemsPerPage}`
                );

                if (!response.isSuccess) {
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setsurveyData(response.data);
                    setTotalItems(response.totalCount);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchSurveyData();

        return () => {
            ignore = true;
        };
    }, [status, searchQuery, page, itemsPerPage]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <PageTitle name={"Survey List"} />
                <Link to={"/survey/create"} className="w-fit">
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Create a Survey
                    </button>
                </Link>
            </div>

            <div className="flex justify-between">
                <ButtonComponent setStatus={setStatus} setPage={setPage} />
                <input
                    type="text"
                    className="pill-primary border-0 w-1/2"
                    placeholder={`Search in ${status} surveys...`}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
                <PaginationSelect
                    setItemsPerPage={setItemsPerPage}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}
                />
            </div>

            <div className=" h-[53vh] bg-white overflow-y-scroll">
                <Table>
                    <Thead headers={HEADERS} />
                    <tbody>
                        {surveyData
                            .toReversed()
                            .map(
                                ({
                                    survey_id,
                                    survey_title,
                                    category,
                                    start_date,
                                    end_date,
                                }) => (
                                    <Trow key={survey_id}>
                                        <Tdata left> {survey_title} </Tdata>
                                        <Tdata capitalize> {category} </Tdata>
                                        <Tdata mono>
                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    {
                                                        convertToLocal(
                                                            start_date
                                                        ).split(",")[0]
                                                    }
                                                </div>
                                                <div className="text-sm">
                                                    {
                                                        convertToLocal(
                                                            start_date
                                                        ).split(",")[1]
                                                    }
                                                </div>
                                            </div>
                                        </Tdata>
                                        <Tdata mono>
                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    {
                                                        convertToLocal(
                                                            end_date
                                                        ).split(",")[0]
                                                    }
                                                </div>
                                                <div className="text-sm ">
                                                    {
                                                        convertToLocal(
                                                            end_date
                                                        ).split(",")[1]
                                                    }
                                                </div>
                                            </div>
                                        </Tdata>
                                        <Tdata>
                                            <div className="flex justify-center gap-4">
                                                {status === "live" ||
                                                status === "expired" ? (
                                                    <div className="flex justify-center">
                                                        <div className="tool-tip-div group">
                                                            <Link
                                                                to={`details/${survey_id}`}
                                                            >
                                                                <i className="fa-solid fa-square-poll-horizontal text-xl"></i>
                                                            </Link>
                                                            <span className="tool-tip-span -right-[3.4rem] bg-black -top-12 ">
                                                                View Response
                                                                <span className="tooltip-arrow bottom-[-2px] left-[45%]"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {status === "upcoming" ? (
                                                    <div className="flex justify-center">
                                                        <div className="tool-tip-div group">
                                                            <Link
                                                                to={`edit-survey/${survey_id}`}
                                                            >
                                                                <i className="fa-solid fa-pen-to-square text-xl"></i>
                                                            </Link>
                                                            <span className="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                                Edit Survey
                                                                <span className="tooltip-arrow bottom-[-2px] left-[38%]"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Tdata>
                                    </Trow>
                                )
                            )}
                    </tbody>
                </Table>
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
