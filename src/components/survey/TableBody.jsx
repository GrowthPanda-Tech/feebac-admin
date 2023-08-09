import { Link } from "react-router-dom";

function TableData({ data, className }) {
    return <td className={`p-6 ${className}`}> {data} </td>
}

export default function TableBody({surveyData}) {
    return (
        <tbody className="text-lg">
            {
                surveyData.map((survey, index) => (
                    <tr key={index}>
                        <TableData data={index + 1} />
                        <TableData data={survey.survey_title} />
                        <TableData data={survey.category} className={'capitalize'} />
                        <TableData data={survey.start_date.split(" ")[0]} />
                        <TableData data={survey.end_date.split(" ")[0]} />
                        <TableData data={`${survey.created_date.split(" ")[1]} - ${survey.end_date.split(" ")[1]}`} />

                        {/* TODO: Put a 3 dot menu here */}
                        <td className="p-6">
                            <Link to={`/survey/details/${survey.survey_id}`}>
                                <button>
                                    <i className="fa-solid fa-info"></i>
                                </button>
                            </Link>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    );
}
