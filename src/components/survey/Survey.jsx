import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";

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
                                        {/* <Link to={`review/${survey_id}`}> */}
                                        {/*     <i className="fa-solid fa-pen-to-square text-xl"></i> */}
                                        {/* </Link> */}
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
