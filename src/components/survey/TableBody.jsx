import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";

function Actions({ id }) {
    const handleStatusToggle = async () => {
        const response = await makeRequest('survey/toggle-survey-status', 'PATCH', {surveyId: id})
        alert(response.message);
    }

    return (
        <div className="flex justify-evenly">
            <Link to={`details/${id}`}>
                <i className="fa-solid fa-square-poll-horizontal"></i>
            </Link>
            <Link to={`edit/${id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button onClick={handleStatusToggle}>
                <i className='fa-solid fa-lock'></i>
            </button>
        </div>
    );
}

function TableData({ data, className = '' }) {
    return <td className={`p-6 ${className}`}> {data} </td>;
}

function TableRow({ survey, index }) {
    return (
        <tr>
            <TableData data={index + 1} />
            <TableData data={survey.survey_title} />
            <TableData data={survey.category} className={'capitalize'} />
            <TableData data={survey.start_date.split(" ")[0]} />
            <TableData data={survey.end_date.split(" ")[0]} />
            <TableData data={`${survey.start_date.split(" ")[1]} - ${survey.end_date.split(" ")[1]}`} />
            <td>
                <Actions id={survey.survey_id} />
            </td>
        </tr>
    );
}

export default function TableBody({data}) {
    return (
        <tbody className="text-lg">
            {
                data.map((survey, index) => (
                    <TableRow key={index} survey={survey} index={index} />
                ))
            }
        </tbody>
    );
}
