import { Link } from "react-router-dom";

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
                        <Link to={`details/${survey.survey_id}`}>
                            <TableData data={survey.survey_title} />
                        </Link>
                        <TableData data={survey.category} className={'capitalize'} />
                        <TableData data={survey.start_date.split(" ")[0]} />
                        <TableData data={survey.end_date.split(" ")[0]} />
                        <TableData data={`${survey.created_date.split(" ")[1]} - ${survey.end_date.split(" ")[1]}`} />
                    </tr>
                ))
            }
        </tbody>
    );
}
