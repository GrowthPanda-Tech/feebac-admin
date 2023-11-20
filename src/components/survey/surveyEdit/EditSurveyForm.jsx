import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";

import dateConvert from "../../../utils/dateConvert";
import dateToday from "../../../utils/dateToday";
import makeRequest from "../../../utils/makeRequest";

import AlertComponent from "../../AlertComponent/AlertComponent";

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
    const { categories } = useContext(CategoryContext);

    const [isDateChange, setIsDateChange] = useState(false);

    const { slug } = useParams();

    const [surveyData, setSurveyData] = useState({
        surveyId: surveyInfo?.survey_id,
        surveyTitle: surveyInfo?.survey_title,
        startDate: dateConvert(surveyInfo?.start_date, "localISO"),
        endDate: dateConvert(surveyInfo?.end_date, "localISO"),
        loyaltyPoint: surveyInfo?.loyalty_point,
        surveyDescription: surveyInfo?.survey_description,
        category: surveyInfo?.category.category_id,
        isUpdateImage: false,
    });

    const [updatedData, setUpdatedData] = useState({
        ...surveyData,
        startDate: surveyInfo?.start_date,
        endDate: surveyInfo?.end_date,
    });

    const handleChange = (e) => {
        if (e.target.name === "startDate" || e.target.name === "endDate") {
            setIsDateChange(true);
            const formattedOutput = dateConvert(e.target.value, "UTC");
            setUpdatedData({
                ...updatedData,
                [e.target.name]: formattedOutput,
            });

            return;
        }
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const dataString = JSON.stringify(profileData);
        const formdata = new FormData();

        for (const [key, value] of Object.entries(updatedData)) {
            formdata.append(key, value);
        }

        // formdata.append("target", dataString);

        try {
            const response = await makeRequest(
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

    return (
        <div className="flex flex-col p-8 gap-8">
            <h1 className="heading mb-0"> Edit Survey Details </h1>

            <div className="grid grid-cols-3 gap-8 ">
                <Label name={"Start Date"}>
                    <Input
                        type={"datetime-local"}
                        min={dateToday()}
                        value={
                            !isDateChange
                                ? surveyData
                                    ? surveyData.startDate
                                    : ""
                                : updatedData
                                ? dateConvert(updatedData.startDate, "localISO")
                                : ""
                        }
                        name={"startDate"}
                        onChange={handleChange}
                    />
                </Label>

                <Label name={"End Date"}>
                    <Input
                        type={"datetime-local"}
                        min={dateToday()}
                        name={"endDate"}
                        onChange={handleChange}
                        value={
                            !isDateChange
                                ? surveyData
                                    ? surveyData.endDate
                                    : ""
                                : updatedData
                                ? dateConvert(updatedData.endDate, "localISO")
                                : ""
                        }
                    />
                </Label>

                <Label name={"Survey Title"}>
                    <Input
                        name={"surveyTitle"}
                        value={updatedData ? updatedData?.surveyTitle : ""}
                        onChange={handleChange}
                    />
                </Label>

                <Label name={"Survey Description"}>
                    <Input
                        name={"surveyDescription"}
                        value={
                            updatedData ? updatedData?.surveyDescription : ""
                        }
                        onChange={handleChange}
                    />
                </Label>

                <Label name={"Select Research Category"}>
                    <Select name={"category"} onChange={handleChange}>
                        <option value={null}>-- Categories --</option>
                        {categories.map((item) => {
                            const value = item.category_id;
                            const selected = value === updatedData.category;
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
                        value={updatedData ? updatedData?.loyaltyPoint : ""}
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
                    Cancel
                </button>
            </div>
        </div>
    );
}
