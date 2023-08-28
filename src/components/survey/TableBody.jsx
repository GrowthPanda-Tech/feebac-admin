import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import TableData from "../TableData";

function Actions({ id }) {
    const handleStatusToggle = async () => {
        const response = await makeRequest(
            "survey/toggle-survey-status",
            "PATCH",
            {
                surveyId: id,
            }
        );
        alert(response.message);
    };

    return (
        <div className="flex justify-evenly">
            <button className="btn-action">
                <Link to={`details/${id}`}>
                    <i className="fa-solid fa-square-poll-horizontal mr-3"></i>
                    Results
                </Link>
            </button>
            {/* <Link to={`edit/${id}`}> */}
            {/*     <i className="fa-solid fa-pen-to-square"></i> */}
            {/* </Link> */}
            {/* <button onClick={handleStatusToggle}> */}
            {/*     <i className='fa-solid fa-lock'></i> */}
            {/* </button> */}
        </div>
    );
}

export default function TableBody({ data }) {
    return (
        <tbody className="text-lg">
            {data.map((survey, index) => {
                return (
                    <tr key={index}>
                        <TableData
                            data={survey.survey_title}
                            left={true}
                            truncate={true}
                        />
                        <TableData data={survey.category} capitalize={true} />
                        <TableData
                            data={survey.start_date.split(" ")[0]}
                            mono={true}
                        />
                        <TableData
                            data={survey.end_date.split(" ")[0]}
                            mono={true}
                        />
                        <TableData
                            data={`${survey.start_date.split(" ")[1]} - ${
                                survey.end_date.split(" ")[1]
                            }`}
                            mono={true}
                            highlight={true}
                        />
                        <td>
                            {" "}
                            <Actions id={survey.survey_id} />{" "}
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}
