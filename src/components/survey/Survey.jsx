import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    const [url, setUrl] = useState("live");

    async function fetchSurveyData() {
        const response = await makeRequest(`site-admin/get-all-survey?time=${url}`, 'GET');
        setsurveyData(response.data);
    }
    useEffect(() => {
        fetchSurveyData();
    }, [url]);

    const columns = ['No.', 'Survey Name', 'Survey Category', 'Start Date', 'End Date', 'Survey Timings', ''];

    return (
        <div className="m-16">
            <Link to={'/survey/create'} className='w-fit'>
                <button className="btn-primary mb-8">
                    <i className="fa-solid fa-plus"></i>
                    Create a Survey
                </button>
            </Link>

            <button onClick={() => setUrl('live')}>Live</button>
            <button onClick={() => setUrl('expired')}>Expired</button>
            <button onClick={() => setUrl('upcoming')}>Upcoming</button>

            {/* Table */}
            <table className="table-auto w-full bg-white rounded-xl mt-8 text-center">
                <TableHeader columns={columns} />
                <TableBody surveyData={surveyData} />
            </table>
        </div>
    );
}
