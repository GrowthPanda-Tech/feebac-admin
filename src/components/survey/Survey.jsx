import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function TypeBtn({ type, setUrl }) {
    return (
        <button className={`capitalize btn-secondary`} onClick={() => setUrl(type)}>
            {type}
        </button>
    );
}

function TypeBtns({setUrl}) {
    return (
        <div className='flex gap-4'>
            <TypeBtn type={'live'} setUrl={setUrl} />
            <TypeBtn type={'upcoming'} setUrl={setUrl} />
            <TypeBtn type={'expired'} setUrl={setUrl} />
        </div>
    );
}

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    const [url, setUrl] = useState("live");

    const columns = ['No.', 'Survey Name', 'Survey Category', 'Start Date', 'End Date', 'Survey Timings'];

    const fetchSurveyData = async () => {
        const response = await makeRequest(`site-admin/get-all-survey?time=${url}`, 'GET');
        setsurveyData(response.data);
    }
    useEffect(() => {
        fetchSurveyData();
    }, [url]);

    return (
        <div className="m-16">
            <Link to={'/survey/create'} className='w-fit'>
                <button className="btn-primary mb-8">
                    <i className="fa-solid fa-plus"></i>
                    Create a Survey
                </button>
            </Link>

            <TypeBtns setUrl={setUrl} />

            {/* Table */}
            <table className="table-fixed w-full bg-white rounded-xl mt-8 text-center">
                <TableHeader columns={columns} />
                <TableBody data={surveyData} />
            </table>
        </div>
    );
}
