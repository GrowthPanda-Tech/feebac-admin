import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import TableData from "../TableData";

function Actions({ id }) {
    const handleStatusToggle = async () => {
        const request = { surveyId: id };
        const response = await makeRequest(
            "survey/toggle-survey-status",
            "PATCH",
            request
        );
        alert(response.message);
    };

    return (
        <div className="flex justify-evenly">
            <Link to={`details/${id}`}>
                <i className="fa-solid fa-square-poll-horizontal"></i>
            </Link>
            <Link to={`review/${id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Link>
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
            {data.map((survey, index) => (
                <tr key={index}>
                    <TableData data={survey.survey_title} left />
                    <TableData data={survey.category} capitalize />
                    <TableData data={survey.start_date.split(" ")[0]} mono />
                    <TableData data={survey.end_date.split(" ")[0]} mono />
                    <TableData
                        data={`${survey.start_date.split(" ")[1]} - ${
                            survey.end_date.split(" ")[1]
                        }`}
                        mono
                    />
                    <td>
                        <Actions id={survey.survey_id} />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
