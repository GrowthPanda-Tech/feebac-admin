import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';

// TODO: refactor table into their components
function TableBody() {
    
}

function TableHeader({ columns }) {
    return (
        <thead className="text-xl">
            <tr>
                {
                    columns.map((column, index) => (
                        <th key={index} className="p-6">{column}</th>
                    ))
                }
            </tr>
        </thead>
    );
}

function Title({ title }) {
    return <h1 className="text-2xl font-semibold"> {title} </h1>
}

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    async function fetchSurveyData() {
        const response = await makeRequest('site-admin/get-all-survey', 'GET');
        setsurveyData(response.data);
    }
    useEffect(() => {
        fetchSurveyData();
    }, []);

    console.log(surveyData);

    const columns = ['No.', 'Survey Name', 'Survey Category', 'Start Date', 'End Date', 'Survey Timings', ''];

    return (
        <div className="m-16">

            {/* Top Section */}
            <div className='flex w-full'>
                <div className="flex flex-col flex-1">
                    <div>
                        <Title title={'Survey Response Metrics'} />
                        <div className='bg-[#EA525F] w-4/5 h-80 my-8 rounded-xl text-white flex flex-col justify-evenly'>
                            <div className='flex flex-col items-center'>
                                <div className='text-4xl'> 5,000 </div>
                                <div className='text-xl mt-3'> Total Responses </div>
                            </div>
                            <div className='flex justify-evenly text-2xl'>
                                <div className='flex flex-col items-center'>
                                    5.32%
                                    <div className='text-base'> Average Time </div>
                                </div>
                                <div className='bg-white w-[0.0625rem]'> </div>
                                <div className='flex flex-col items-center'>
                                    84.32%
                                    <div className='text-base'> Completion Time </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={'/survey/create'} className='w-fit'>
                        <button className="btn-primary mb-8">
                            <i className="fa-solid fa-plus"></i>
                            Create a Survey
                        </button>
                    </Link>
                </div>
                
                <div className='flex-1'>
                    <Title title={'Audience Demographic by Gender'} />
                    <div className='bg-white h-3/4 my-8 rounded-xl flex justify-center items-center'>
                        GRAPH
                    </div>
                </div>
            </div>

            <Title title={'Survey List'} />

            {/* Table */}
            <table className="table-auto w-full bg-white rounded-xl mt-8 text-center">
                <TableHeader columns={columns} />
                <tbody className="text-lg">
                    {
                        surveyData.map((survey, index) => (
                            <tr key={index}>
                                <td className="p-6">
                                    {index + 1}
                                </td>
                                <td className="p-6">
                                    {survey.survey_title}
                                </td>
                                <td className="p-6 capitalize">
                                    {survey.category}
                                </td>
                                <td className="p-6">
                                    {survey.start_date.split(" ")[0]}
                                </td>
                                <td className="p-6">
                                    {survey.end_date.split(" ")[0]}
                                </td>
                                <td>
                                    {survey.created_date.split(" ")[1]} - {survey.end_date.split(" ")[1]} 
                                </td>
                                <td className="p-6 flex gap-4 justify-evenly">
                                    <Link>
                                        <button className="btn-actions">
                                            Edit
                                        </button>
                                    </Link>
                                    <Link to={`/survey/survey-details/${survey.survey_id}`}>
                                        <button className="btn-actions">
                                            Show Info
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
