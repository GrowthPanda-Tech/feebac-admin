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

const HEADERS = ["Title", "Category", "Start Date", "End Date", "Actions"];

function Button({ type, setStatus, isActive, onClick }) {
    const handleClick = () => {
        setStatus(type);
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

function ButtonComponent({ setStatus }) {
    const [activeButton, setactiveButton] = useState(1);
    const handleClick = (buttonId) => setactiveButton(buttonId);

    return (
        <div className="flex gap-4">
            <Button
                type={"live"}
                setStatus={setStatus}
                isActive={activeButton === 1}
                onClick={() => handleClick(1)}
            />
            <Button
                type={"upcoming"}
                setStatus={setStatus}
                isActive={activeButton === 2}
                onClick={() => handleClick(2)}
            />
            <Button
                type={"expired"}
                setStatus={setStatus}
                isActive={activeButton === 3}
                onClick={() => handleClick(3)}
            />
        </div>
    );
}

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    const [status, setStatus] = useState("live");

    const convertToLocal = (date) => {
        const dateObj = new Date(`${date} UTC`);
        return dateObj.toLocaleString();
    };

    useEffect(() => {
        let ignore = false;

        async function fetchSurveyData() {
            try {
                const response = await makeRequest(
                    `site-admin/get-all-survey?time=${status}`
                );

                if (!response.isSuccess) {
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setsurveyData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchSurveyData();

        return () => {
            ignore = true;
        };
    }, [status]);

    return (
        <div className="flex flex-col gap-8">
            {/* <div className="w-full gap-20 flex justify-between"> */}
            {/* <div className="w-1/2 flex flex-col ">
                    <PageTitle name={"Survey Response Metrics"} /> */}
            {/* <div className="bg-[#EA525F] mt-6 p-10 rounded-lg items-center w-full flex flex-col gap-16 text-white">
                        <div className="flex flex-col text-center w-full">
                            <h2 className="text-5xl p-2">0</h2>
                            <h3 className="text-2xl">Total Response</h3>
                        </div>
                        <div className="flex justify-between p-4 mx-auto text-center divide-x w-full">
                            <div className="w-full">
                                <h3 className="text-2xl">0hr</h3>
                                <h3>Average Time</h3>
                            </div>
                            <div className="w-full">
                                <h3 className="text-2xl">0%</h3>
                                <h3>Completion Rate</h3>
                            </div>
                        </div>
                    </div> */}
            {/* </div> */}
            {/* </div> */}

            <div className="flex justify-between items-center">
                <PageTitle name={"Survey List"} />
                <Link to={"/survey/create"} className="w-fit">
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Create a Survey
                    </button>
                </Link>
            </div>

            <ButtonComponent setStatus={setStatus} />

            <div className=" h-[60vh] bg-white overflow-y-scroll">
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
        </div>
    );
}
