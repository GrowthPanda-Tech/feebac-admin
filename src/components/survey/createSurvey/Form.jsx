import { useState, useEffect } from "react";
import Filters from './filter/Filters';
import makeRequest from "../../../utils/makeRequest";

export default function Form({ setSurveyId, setIsSurveyCreate }) {
    const today = new Date().toISOString().slice(0, 16);

    const [categories, setCategories] = useState([]);
    const [surveyData, setSurveyData] = useState({category: '1'});
    const [surveyFilters, setSurveyFilters] = useState({});
    const [filters, setFilters] = useState({});
    const [isShowFilter, setIsShowFilter] = useState(false);

    const getCategories = async () => {
        const response = await makeRequest('survey/get-all-category', 'GET');
        response.isSuccess ? setCategories(response.categoryList) : alert(response.message);
    }

    const getFilters = async () => {
        const response = await makeRequest('config/get-profile-key-value', 'GET');
        response.isSuccess ? setFilters(response.data) : alert(response.message);
    }

    const handleChange = (e) => {
        if (e.target.name === "startDate" || e.target.name === "endDate") {
            const localDateObject = new Date(e.target.value);

            const utcYear = localDateObject.getUTCFullYear();
            const utcMonth = localDateObject.getUTCMonth();
            const utcDay = localDateObject.getUTCDate();
            const utcHours = localDateObject.getUTCHours();
            const utcMinutes = localDateObject.getUTCMinutes();

            const formattedOutput = `${utcYear}/${String(utcMonth + 1).padStart(2, '0')}/${String(utcDay).padStart(2, '0')} ${String(utcHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:00`;

            setSurveyData({ ...surveyData, [e.target.name]: formattedOutput });
            return;
        }
        setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        setSurveyData({...surveyData, target: surveyFilters})
        const response = await makeRequest('site-admin/create-survey', 'POST', surveyData);
        alert(response.message);

        if (response.isSuccess) {
            setSurveyId(response.surveyId);
            setIsSurveyCreate(response.isSuccess);
        } 
    }

    useEffect(() => {
        getCategories();
        getFilters();
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <h1 className='heading mb-0'> Create New Survey </h1>

            {/* TODO: refactor this */}
            <div className="grid gap-5 grid-rows-2 grid-cols-3">
                <label>
                    Scheduled Start Date *
                    <input type="datetime-local" min={today} name="startDate" className="w-full input-primary" onChange={handleChange} required />
                </label>
                <label>
                    Scheduled End Date *
                    <input type="datetime-local" min={today} name="endDate" className="w-full input-primary" onChange={handleChange} required />
                </label>
                <label>
                    New Survey Name *
                    <input className="w-full input-primary" name="surveyTitle" onChange={handleChange} required />
                </label>
                <label>
                    Survey Description *
                    <input className="w-full input-primary" name="surveyDescription" onChange={handleChange} required />
                </label>
                <label>
                    Select Category *
                    <select className="capitalize w-full input-primary bg-white" name="category" onChange={handleChange} required >
                        {
                            categories.map((item) => (
                                <option key={item.category_id} value={item.category_id}>
                                    {item.category_name}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label>
                    Loyalty Points *
                    <input name="loyaltyPoint" onChange={handleChange} className="w-full input-primary" />
                </label>
            </div>

            { isShowFilter && <Filters filters={filters} setSurveyFilters={setSurveyFilters} /> }

            <div className="flex gap-4">
                <button
                    className="btn-primary bg-accent w-fit"
                    onClick={() => setIsShowFilter(!isShowFilter)}>
                    <i className="fa-solid fa-plus"></i>
                    Add Filters
                </button>
                <button className="btn-primary w-fit" onClick={handleSubmit}> Create </button>
            </div>
        </div>
    );
}
