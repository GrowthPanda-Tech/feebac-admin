import { Link } from "react-router-dom";
import { useState } from "react";

function OverflowMenu({id}) {
    return (
        <div className="absolute right-0 mt-2 mr-2 w-32 bg-white border border-grey rounded-lg shadow-lg">
            <ul className="py-1">
                <li className="hover:bg-lighest-grey px-4 py-2 cursor-pointer">Edit</li>
                <Link to={`/survey/details/${id}`}>
                    <li className="hover:bg-lighest-grey px-4 py-2 cursor-pointer">Info</li>
                </Link>
            </ul>
        </div>
    );
}

function TableData({ data, className }) {
    return <td className={`p-6 ${className}`}> {data} </td>;
}

export default function TableBody({data}) {
    return (
        <tbody className="text-lg">
            {
                data.map((survey, index) => {
                    const [menuVisible, setMenuVisible] = useState(false);

                    return (
                        <tr key={index}>
                            <TableData data={index + 1} />
                            <TableData data={survey.survey_title} />
                            <TableData data={survey.category} className={'capitalize'} />
                            <TableData data={survey.start_date.split(" ")[0]} />
                            <TableData data={survey.end_date.split(" ")[0]} />
                            <TableData data={`${survey.created_date.split(" ")[1]} - ${survey.end_date.split(" ")[1]}`} />

                            {/* TODO: Put a 3 dot menu here */}
                            <td className="p-6">
                                {/* <Link to={`/survey/details/${survey.survey_id}`}> */}
                                {/*     <button> */}
                                {/*         <i className="fa-solid fa-info"></i> */}
                                {/*     </button> */}
                                {/* </Link> */}
                                <button onClick={() => setMenuVisible(!menuVisible)}>
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                {menuVisible && <OverflowMenu id={survey.survey_id} />}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    );
}
