import { Link } from "react-router-dom";

function Actions({ id, isPulic }) {
    return (
        <div className="flex gap-2">
            <Link to={`details/${id}`}>
                <i className="fa-solid fa-square-poll-horizontal"></i>
            </Link>
            <Link>
                <i className="fa-solid fa-pen-to-square"></i>
            </Link>
        </div>
    );
}

function TableData({ data, className = '' }) {
    return <td className={`p-6 ${className}`}> {data} </td>;
}

export default function TableBody({data}) {
    return (
        <tbody className="text-lg">
            {
                data.map((survey, index) => (
                    <tr key={index}>
                        <TableData data={index + 1} />
                        <TableData data={survey.survey_title} />
                        <TableData data={survey.category} className={'capitalize'} />
                        <TableData data={survey.start_date.split(" ")[0]} />
                        <TableData data={survey.end_date.split(" ")[0]} />
                        <TableData data={`${survey.created_date.split(" ")[1]} - ${survey.end_date.split(" ")[1]}`} />
                        <td>
                            <Actions id={survey.survey_id} isPulic={survey.is_public} />
                        </td>
                    </tr>
                ))
            }
        </tbody>
    );
}
