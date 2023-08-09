import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    async function fetchSurveyData() {
        const response = await makeRequest('site-admin/get-all-survey?time=upcoming', 'GET');
        setsurveyData(response.data);
    }
    useEffect(() => {
        fetchSurveyData();
    }, []);

    const columns = ['No.', 'Survey Name', 'Survey Category', 'Start Date', 'End Date', 'Survey Timings', ''];

    return (
        <div className="m-16">
            <Link to={'/survey/create'} className='w-fit'>
                <button className="btn-primary mb-8">
                    <i className="fa-solid fa-plus"></i>
                    Create a Survey
                </button>
            </Link>

            {/* Table */}
            <table className="table-auto w-full bg-white rounded-xl mt-8 text-center">
                <TableHeader columns={columns} />
                <TableBody surveyData={surveyData} />
            </table>
        </div>
    );
}
