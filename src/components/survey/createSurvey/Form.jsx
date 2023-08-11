import { useState, useEffect } from "react";
import makeRequest from "../../../utils/makeRequest";

export default function Form({ setSurveyId, setIsSurveyCreate }) {
    const [categories, setCategories] = useState([]);
    const [surveyData, setSurveyData] = useState({category: '1'});

    console.log(surveyData);

    // TODO: put this is localStorage
    const fetchCategories = async () => {
        const response = await makeRequest('survey/get-all-category', 'GET');
        setCategories(response.categoryList);
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        if (e.target.name === "startDate" || e.target.name === "endDate") {
            const dateTimeLocal = new Date(e.target.value);
            const formattedDateTime = dateTimeLocal.toISOString().replace('T', ' ').replace(/-/g, '/').slice(0, 19);

            setSurveyData({ ...surveyData, [e.target.name]: formattedDateTime });
            return;
        }
        setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const response = await makeRequest('site-admin/create-survey', 'POST', surveyData);
        alert(response.message);

        if (response.isSuccess) {
            setSurveyId(response.surveyId);
            setIsSurveyCreate(response.isSuccess);
        } 

        return;
    }

    const today = new Date().toISOString().slice(0, 16);

    return (
        <>
            <div className="grid gap-5 grid-rows-2 grid-cols-3">
                <label>
                    Scheduled Start Date
                    <input type="datetime-local" min={today} name="startDate" className="w-full input-primary" onChange={handleInputChange} required />
                </label>
                <label>
                    Scheduled End Date
                    <input type="datetime-local" min={today} name="endDate" className="w-full input-primary" onChange={handleInputChange} required />
                </label>
                <label>
                    New Survey Name
                    <input className="w-full input-primary" name="surveyTitle" onChange={handleInputChange} required />
                </label>
                <label>
                    Survey Description
                    <input className="w-full input-primary" name="surveyDescription" onChange={handleInputChange} required />
                </label>
                <label>
                    Select Category
                    <select className="capitalize w-full input-primary bg-white" name="category" onChange={handleInputChange} required >
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
                    Loyalty Points
                    <input placeholder="25" name="loyaltyPoint" onChange={handleInputChange} className="w-full input-primary" />
                </label>
            </div>
            <button className="btn-primary w-fit" onClick={handleSubmit}> Create </button>
        </>
    );
}
