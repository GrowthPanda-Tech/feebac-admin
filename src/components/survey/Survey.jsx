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
        <button className={`capitalize ${isActive ? 'pill-primary' : 'pill-secondary'}`} onClick={handleClick}>
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

    const columns = ['Title', 'Category', 'Start Date', 'End Date', 'Timings'];

    const fetchSurveyData = async () => {
        const response = await makeRequest(`site-admin/get-all-survey?time=${url}`, 'GET');
        setsurveyData(response.data);
    }
    useEffect(() => {
        fetchSurveyData();
    }, [url]);

    return (
        <>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='heading mb-0'> Survey List </h1>
                <Link to={'/survey/create'} className='w-fit'>
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Create a Survey
                    </button>
                </Link>
            </div>

            <ButtonComponent setUrl={setUrl} />

            {/* Table */}
            <table className="table mt-8">
                <TableHead headers={columns} />
                <TableBody data={surveyData} />
            </table>
        </>
    );
}
