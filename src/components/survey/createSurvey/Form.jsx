import { useState, useEffect } from "react";
import Filters from "./filter/Filters";
import makeRequest from "../../../utils/makeRequest";
import convertToUTC from "../../../utils/convertToUTC";

const TODAY = new Date().toISOString().slice(0, 16);

function Input({ type = "text", name, onChange }) {
    return (
        <input
            type={type}
            name={name}
            className="w-full input-primary"
            onChange={onChange}
            required
        />
    );
}

function Label({ name, children }) {
    return (
        <label>
            <span className="font-medium">{name}*</span>
            {children}
        </label>
    );
}

export default function Form({
    setSurveyId,
    setSurveyTitle,
    setIsSurveyCreate,
}) {
    const [categories, setCategories] = useState([]);
    const [surveyFilters, setSurveyFilters] = useState({});
    const [filters, setFilters] = useState({});
    const [isShowFilter, setIsShowFilter] = useState(false);

    const [surveyData, setSurveyData] = useState([]);

    const getCategories = async () => {
        const response = await makeRequest("survey/get-all-category", "GET");
        response.isSuccess
            ? setCategories(response.categoryList)
            : alert(response.message);
    };

    const getFilters = async () => {
        const response = await makeRequest(
            "config/get-profile-key-value",
            "GET"
        );
        response.isSuccess
            ? setFilters(response.data)
            : alert(response.message);
    };

    const handleChange = (e) => {
        if (e.target.name === "startDate" || e.target.name === "endDate") {
            const localDateObject = new Date(e.target.value);
            const formattedOutput = convertToUTC(localDateObject);
            setSurveyData({ ...surveyData, [e.target.name]: formattedOutput });
            return;
        }
        setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setSurveyData({ ...surveyData, target: surveyFilters });
        const response = await makeRequest(
            "site-admin/create-survey",
            "POST",
            surveyData
        );
        alert(response.message);

        if (response.isSuccess) {
            setSurveyId(response.surveyId);
            setSurveyTitle(surveyData.surveyTitle);
            setIsSurveyCreate(response.isSuccess);
        }
    };

    useEffect(() => {
        getCategories();
        getFilters();
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <h1 className="heading mb-0"> Create New Survey </h1>

            {/* TODO: refactor this */}
            <div className="grid gap-5 grid-rows-2 grid-cols-3">
                <Label name={"Scheduled Start Date"}>
                    <input
                        type="datetime-local"
                        min={TODAY}
                        name="startDate"
                        className="w-full input-primary"
                        onChange={handleChange}
                        required
                    />
                </Label>

                <Label name={"Scheduled End Date"}>
                    <input
                        type="datetime-local"
                        min={TODAY}
                        name="endDate"
                        className="w-full input-primary"
                        onChange={handleChange}
                        required
                    />
                </Label>

                <Label name={"New Survey Title"}>
                    <Input name={"surveyTitle"} onChange={handleChange} />
                </Label>

                <Label name={"Survey Description"}>
                    <Input name={"surveyDescription"} onChange={handleChange} />
                </Label>

                <Label name={"Select Category"}>
                    <select
                        className="capitalize w-full input-primary bg-white"
                        name="category"
                        onChange={handleChange}
                        required
                    >
                        {categories.map((item) => (
                            <option
                                key={item.category_id}
                                value={item.category_id}
                            >
                                {item.category_name}
                            </option>
                        ))}
                    </select>
                </Label>

                <Label name={"Loyalty Points"}>
                    <Input name={"loyaltyPoint"} onChange={handleChange} />
                </Label>
            </div>

            {isShowFilter && (
                <Filters
                    filters={filters}
                    setSurveyFilters={setSurveyFilters}
                />
            )}

            <div className="flex gap-4">
                <button
                    className="btn-primary bg-accent w-fit"
                    onClick={() => setIsShowFilter(!isShowFilter)}
                >
                    <i className="fa-solid fa-plus"></i>
                    Add Filters
                </button>
                <button className="btn-primary w-fit" onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    );
}
