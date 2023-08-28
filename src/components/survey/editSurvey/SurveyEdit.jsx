import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../../../utils/makeRequest";

export default function SurveyEdit() {
    const { slug } = useParams();

    const [surveyData, setSurveyData] = useState({});

    const getSurveyData = async () => {
        const response = await makeRequest(`survey/show-survey?sid=${slug}`);
        setSurveyData(response.surveyInfo);
    };

    const handleInputChange = (e) =>
        setSurveyData({ ...surveyData, [e.target.name]: e.target.value });

    // god damn
    const updateSurvey = async () => {
        const request = {
            surveyId: surveyData.survey_id,
            surveyTitle: surveyData.survey_title,
            surveyDescription: surveyData.survey_description,
            category: 1,
            startDate: "2023/08/12 10:00:00",
            endDate: "2023/08/13 10:00:00",
        };
        const response = await makeRequest(
            "survey/update-survey",
            "PUT",
            request
        );
        alert(response.message);
    };

    useEffect(() => {
        getSurveyData();
    }, []);

    console.log(surveyData);

    return (
        <div className="p-8">
            <h1 className="heading mb-4"> Edit Survey </h1>
            <div className="grid gap-5 grid-cols-3">
                <label>
                    Scheduled Start Date
                    <input
                        type="datetime-local"
                        name="startDate"
                        className="w-full input-primary"
                        required
                    />
                </label>
                <label>
                    Scheduled End Date
                    <input
                        type="datetime-local"
                        name="endDate"
                        className="w-full input-primary"
                        required
                    />
                </label>
                <label>
                    New Survey Name
                    <input
                        className="w-full input-primary"
                        value={surveyData.survey_title}
                        name="survey_title"
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </label>
                <label>
                    Survey Description
                    <input
                        className="w-full input-primary"
                        value={surveyData.survey_description}
                        name="survey_description"
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </label>
                <label>
                    Select Category
                    <select
                        className="capitalize w-full input-primary bg-white"
                        name="category"
                        required
                    >
                        {/* { */}
                        {/*     categories.map((item) => ( */}
                        {/*         <option key={item.category_id} value={item.category_id}> */}
                        {/*             {item.category_name} */}
                        {/*         </option> */}
                        {/*     )) */}
                        {/* } */}
                    </select>
                </label>
                <label>
                    Loyalty Points
                    <input
                        type="number"
                        value={surveyData.loyalty_point}
                        name="loyalty_point"
                        onChange={(e) => handleInputChange(e)}
                        className="w-full input-primary"
                    />
                </label>
            </div>
            <button className="btn-primary" onClick={updateSurvey}>
                Edit
            </button>
        </div>
    );
}
