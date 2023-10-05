import { useState, useEffect } from "react";
import Filters from "../createSurvey/filter/Filters";
import makeRequest from "../../../utils/makeRequest";
import convertToUTC from "../../../utils/convertToUTC";
import formSubmit from "../../../utils/formSubmit";
import { useNavigate, useParams } from "react-router-dom";
import AlertComponent from "../../AlertComponent/AlertComponent";

const TODAY = new Date().toISOString().slice(0, 16);

function Select({ name, onChange, children }) {
    return (
        <select
            name={name}
            onChange={onChange}
            className="bg-[#F6F6F6] border border-[#858585] rounded-xl py-2 px-5 h-fit w-2/3 capitalize"
        >
            {children}
        </select>
    );
}

function Input({ type, min, value, name, onChange }) {
    return (
        <input
            type={type}
            min={min}
            name={name}
            onChange={onChange}
            value={value}
            className="bg-[#F6F6F6] border border-[#858585] rounded-xl py-2 px-5 h-fit w-2/3"
            required
        />
    );
}

function Label({ name, children }) {
    return (
        <label className="flex items-center gap-2">
            <span className="font-medium">{name}*</span>
            {children}
        </label>
    );
}

export default function EditSurveyForm({
    setSurveyEditPop,
    surveyInfo,
    setSurveyInfo,
}) {
    const [isDateChange, setIsDateChange] = useState(false);

    const convertToCalendarFormat = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const convertToLocal = (date) => {
        const dateObj = new Date(`${date} UTC`);
        return convertToCalendarFormat(dateObj);
    };

    const { slug } = useParams();
    const [categories, setCategories] = useState([]);
    const [surveyData, setSurveyData] = useState({
        surveyId: surveyInfo?.survey_id,
        surveyTitle: surveyInfo?.survey_title,
        startDate: convertToLocal(surveyInfo?.start_date),
        endDate: convertToLocal(surveyInfo?.end_date),
        loyaltyPoint: surveyInfo?.loyalty_point,
        surveyDescription: surveyInfo?.survey_description,
        category: surveyInfo?.category.category_id,
        isUpdateImage: false,
    });

    const [profileData, setProfileData] = useState({});
    const [updatedData, setUpdatedData] = useState({
        ...surveyData,
        startDate: surveyInfo?.start_date,
        endDate: surveyInfo?.end_date,
    });

    // console.log(surveyData.startDate.split("/").join("-"));
    const getCategories = async () => {
        const response = await makeRequest(
            "site-admin/get-all-category",
            "GET"
        );
        response.isSuccess && setCategories(response.categoryList);
    };
    console.log(surveyInfo.startDate);

    const handleChange = (e) => {
        if (e.target.name === "startDate" || e.target.name === "endDate") {
            console.log("hi");
            setIsDateChange(true);
            console.log(e.target.value);
            const localDateObject = new Date(e.target.value);
            const formattedOutput = convertToUTC(localDateObject);
            console.log(formattedOutput);
            setUpdatedData({
                ...updatedData,
                [e.target.name]: formattedOutput,
            });

            return;
        }
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        try {
            const dataString = JSON.stringify(profileData);
            const formdata = new FormData();

            for (const [key, value] of Object.entries(updatedData)) {
                formdata.append(key, value);
            }

            formdata.append("target", dataString);

            const response = await formSubmit(
                event,
                "site-admin/update-survey",
                "PUT",
                formdata
            );
            if (response.isSuccess) {
                AlertComponent("success", response);
                const getData = async () => {
                    const response = await makeRequest(
                        `survey/show-survey?sid=${slug}`,
                        "GET"
                    );
                    if (response.isSuccess) {
                        setSurveyInfo(response.surveyInfo);
                    }
                };
                getData();

                setSurveyEditPop(false);
            } else AlertComponent("failed", response);
        } catch (error) {
            AlertComponent("error", "", "Please Enter Valid Value");
        }
    };

    console.log(updatedData);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="flex flex-col p-8 gap-8">
            <h1 className="heading mb-0"> Edit Survey Details </h1>

            <div className="grid grid-cols-3 gap-8 ">
                <Label name={"Start Date"}>
                    <Input
                        type={"datetime-local"}
                        min={TODAY}
                        value={
                            !isDateChange
                                ? surveyData
                                    ? surveyData.startDate
                                    : ""
                                : updatedData
                                ? convertToLocal(updatedData.startDate)
                                : ""
                        }
                        name={"startDate"}
                        onChange={handleChange}
                    />
                </Label>

                <Label name={"End Date"}>
                    <Input
                        type={"datetime-local"}
                        min={TODAY}
                        name={"endDate"}
                        onChange={handleChange}
                        value={
                            !isDateChange
                                ? surveyData
                                    ? surveyData.endDate
                                    : ""
                                : updatedData
                                ? convertToLocal(updatedData.endDate)
                                : ""
                        }
                    />
                </Label>

                <Label name={"Survey Title"}>
                    <Input
                        name={"surveyTitle"}
                        value={surveyData ? surveyData?.surveyTitle : ""}
                        onChange={handleChange}
                    />
                </Label>

                <Label name={"Survey Description"}>
                    <Input
                        name={"surveyDescription"}
                        value={surveyData ? surveyData?.surveyDescription : ""}
                        onChange={handleChange}
                    />
                </Label>

                <Label name={"Select Research Category"}>
                    <Select name={"category"} onChange={handleChange}>
                        <option value={null}>-- Categories --</option>
                        {categories.map((item) => {
                            const value = item.category_id;
                            const selected = value === surveyData.category;
                            return (
                                <option
                                    key={item.category_id}
                                    value={item.category_id}
                                    selected={selected}
                                >
                                    {item.category_name}
                                </option>
                            );
                        })}
                    </Select>
                </Label>

                <Label name={"Loyalty Points Per Use"}>
                    <Input
                        type={"number"}
                        name={"loyaltyPoint"}
                        onChange={handleChange}
                        value={surveyData ? surveyData?.loyaltyPoint : ""}
                    />
                </Label>
            </div>

            <div className="flex gap-4">
                <button className="btn-primary w-fit" onClick={handleSubmit}>
                    Save Changes
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => {
                        setSurveyEditPop(false);
                    }}
                >
                    cancel
                </button>
            </div>
        </div>
    );
}
