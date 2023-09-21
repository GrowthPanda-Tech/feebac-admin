import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import MyResponsiveBar from "./Databar";

function Button({ type, setUrl, isActive, onClick }) {
    const handleClick = () => {
        setUrl(type);
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

function ButtonComponent({ setUrl }) {
    const [activeButton, setactiveButton] = useState(1);
    const handleClick = (buttonId) => setactiveButton(buttonId);

    return (
        <div className="flex gap-4">
            <Button
                type={"live"}
                setUrl={setUrl}
                isActive={activeButton === 1}
                onClick={() => handleClick(1)}
            />
            <Button
                type={"upcoming"}
                setUrl={setUrl}
                isActive={activeButton === 2}
                onClick={() => handleClick(2)}
            />
            <Button
                type={"expired"}
                setUrl={setUrl}
                isActive={activeButton === 3}
                onClick={() => handleClick(3)}
            />
        </div>
    );
}

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    const [url, setUrl] = useState("live");

    const headers = [
        "Title",
        "Category",
        "Start Date",
        "End Date",
        "Timings",
        "Actions",
    ];

    const fetchSurveyData = async () => {
        const response = await makeRequest(
            `site-admin/get-all-survey?time=${url}`,
            "GET"
        );
        setsurveyData(response.data);
    };
    useEffect(() => {
        fetchSurveyData();
    }, [url]);

    return (
        <div className="flex flex-col gap-8">
            <div className="w-full gap-20 flex justify-between">
                <div className="w-1/2 flex flex-col ">
                    <h2 className="heading mb-0">Survey Response Metrics</h2>
                    <div className="bg-[#EA525F] mt-6 p-10 rounded-lg items-center w-full flex flex-col gap-16 text-white">
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
                    </div>
                </div>
                <div className="w-1/2 flex flex-col">
                    <h2 className="heading mb-0">
                        Audience Demographic By Gender
                        <div className="h-[40vh]">
                            <MyResponsiveBar />
                        </div>
                    </h2>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="heading mb-0"> Survey List </h1>
                <Link to={"/survey/create"} className="w-fit">
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Create a Survey
                    </button>
                </Link>
            </div>

            <ButtonComponent setUrl={setUrl} />

            <Table>
                <Thead headers={headers} />
                <tbody>
                    {surveyData.map(
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
                                <Tdata mono>{start_date.split(" ")[0]}</Tdata>
                                <Tdata mono>{end_date.split(" ")[0]}</Tdata>
                                <Tdata mono>
                                    {`${start_date.split(" ")[1]} - ${
                                        end_date.split(" ")[1]
                                    }`}
                                </Tdata>
                                <Tdata>
                                    <div className="flex justify-evenly">
                                        <Link to={`details/${survey_id}`}>
                                            <i className="fa-solid fa-square-poll-horizontal text-xl"></i>
                                        </Link>
                                        {url == "upcoming" ? (
                                            <Link
                                                to={`edit-survey/${survey_id}`}
                                            >
                                                <i className="fa-solid fa-pen-to-square text-xl"></i>
                                            </Link>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </Tdata>
                            </Trow>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}
