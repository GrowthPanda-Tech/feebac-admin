import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import TableHead from '../TableHead';
import TableBody from './TableBody';

function Button({ type, setUrl, isActive, onClick }) {
    const handleClick = () => {
        setUrl(type);
        onClick();
    }

    return (
        <button className={`capitalize btn-${isActive ? 'primary' : 'secondary'}`} onClick={handleClick}>
            {type}
        </button>
    );
}

function ButtonComponent({setUrl}) {
    const [activeButton, setactiveButton] = useState(1);
    const handleClick = (buttonId) => setactiveButton(buttonId);

    return (
        <div className='flex gap-4'>
            <Button type={'live'} setUrl={setUrl} isActive={activeButton === 1} onClick={() => handleClick(1)} />
            <Button type={'upcoming'} setUrl={setUrl} isActive={activeButton === 2} onClick={() => handleClick(2)} />
            <Button type={'expired'} setUrl={setUrl} isActive={activeButton === 3} onClick={() => handleClick(3)} />
        </div>
    );
}

export default function Survey() {
    const [surveyData, setsurveyData] = useState([]);
    const [url, setUrl] = useState("live");

    const columns = ['No.', 'Survey Name', 'Survey Category', 'Start Date', 'End Date', 'Survey Timings', ' '];

    const fetchSurveyData = async () => {
        const response = await makeRequest(`site-admin/get-all-survey?time=${url}`, 'GET');
        setsurveyData(response.data);
    }
    useEffect(() => {
        fetchSurveyData();
    }, [url]);

    return (
        <>
            <Link to={'/survey/create'} className='w-fit'>
                <button className="btn-primary mb-8">
                    <i className="fa-solid fa-plus"></i>
                    Create a Survey
                </button>
            </Link>

            <h1 className='heading'> Survey List </h1>

            <ButtonComponent setUrl={setUrl} />

            {/* Table */}
            <table className="table-fixed w-full bg-white rounded-xl mt-8 text-center">
                <TableHead headers={columns} />
                <TableBody data={surveyData} />
            </table>
        </>
    );
}
