import { useState, useEffect, useContext } from "react";

import makeRequest from "../../../utils/makeRequest";
import formSubmit from "../../../utils/formSubmit";
import removeForbiddenChars from "../../../utils/removeForbiddenChars";
import convertToUTC from "../../../utils/convertToUTC";

import upload from "../../../assets/upload.png";

//components
import Filters from "./filter/Filters";
import PageTitle from "../../PageTitle";
import AlertComponent from "../../AlertComponent/AlertComponent";

import { CategoryContext } from "../../../contexts/CategoryContext";
import { useRef } from "react";

const TODAY = new Date().toISOString().slice(0, 16);

function UserCount({ type, count }) {
    return (
        <div className="flex gap-4 items-center">
            <span className="font-medium text-xl">
                {type === "total"
                    ? "Total Registered Users"
                    : type === "filter"
                    ? "Filtered Users"
                    : null}
                :
            </span>
            <span
                className={`${
                    type === "filter" ? "bg-secondary text-white" : "bg-white"
                } font-medium py-2 px-5 rounded-md`}
            >
                {count}
            </span>
        </div>
    );
}

function Select({ name, value, onChange, children }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="bg-[#F6F6F6] border border-[#858585] rounded-xl py-2 px-5 h-fit w-2/3 capitalize"
        >
            {children}
        </select>
    );
}

function Input({ type, min, name, onChange }) {
    return (
        <input
            type={type}
            min={min}
            name={name}
            onChange={onChange}
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

export default function CreateSurveyForm({
    setSurveyId,
    setSurveyTitle,
    setIsSurveyCreate,
}) {
    const { categories } = useContext(CategoryContext);

    let initCat = categories[0]?.category_id ? categories[0].category_id : "";

    const [filters, setFilters] = useState([]);
    const [surveyData, setSurveyData] = useState({
        category: initCat,
    });
    const [profileData, setProfileData] = useState({});
    const [userCount, setUserCount] = useState(0);
    const [filterdUserCount, setFilteredUserCount] = useState(0);

    const [isDragging, setIsDragging] = useState(false);

    const imgRef = useRef(null);

    const getFilters = async () => {
        try {
            const response = await makeRequest("config/get-profile-key-value");

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            setFilters(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserCount = async () => {
        try {
            const response = await makeRequest(
                "site-admin/get-target-profile-count?target={}"
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            setUserCount(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFilterCount = async () => {
        const filterCount = JSON.stringify(profileData);

        try {
            const response = await makeRequest(
                `site-admin/get-target-profile-count?target=${filterCount}`
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            setFilteredUserCount(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "startDate" || name === "endDate") {
            const localDateObject = new Date(value);
            const formattedOutput = convertToUTC(localDateObject);

            setSurveyData({ ...surveyData, [name]: formattedOutput });

            return;
        }

        if (name === "surveyImg") {
            const file = e.target.files[0];
            setSurveyData({ ...surveyData, surveyImg: file });

            // if (file) {
            //     const reader = new FileReader();
            //     reader.onload = () => setImgPreview(reader.result);
            //     reader.readAsDataURL(file);
            // }

            return;
        }

        setSurveyData({ ...surveyData, [name]: value });
    };

    const handleDrop = (e) => {
        e.preventDefault();

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    setSurveyData({ ...surveyData, surveyImg: file });
                }
            });
        } else {
            [...e.dataTransfer.files].forEach((file) => {
                setSurveyData({ ...surveyData, surveyImg: file });
            });
        }

        setIsDragging(false);
    };

    const handleDragover = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleSubmit = async (event) => {
        try {
            const dataString = JSON.stringify(profileData);
            const formdata = new FormData();

            for (const [key, value] of Object.entries(surveyData)) {
                if (key === "surveyImg") {
                    formdata.append(key, value, value.name);
                    continue;
                }

                if (key === "category" && value === "") {
                    formdata.append(key, categories[0].category_id);
                    continue;
                }

                formdata.append(key, value);
            }

            formdata.append("target", dataString);

            const response = await formSubmit(
                event,
                "site-admin/create-survey",
                "POST",
                formdata
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            AlertComponent("success", response.message);

            setSurveyId(response.surveyId);
            setSurveyTitle(surveyData.surveyTitle);
            setIsSurveyCreate(response.isSuccess);
        } catch (error) {
            AlertComponent("failed", error);
        }
    };

    useEffect(() => {
        getFilters();
        getUserCount();
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Create New Survey"} />

            <div className="grid grid-cols-3 gap-8 ">
                <Label name={"Start Date"}>
                    <Input
                        type={"datetime-local"}
                        min={TODAY}
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
                    />
                </Label>

                <Label name={"Survey Title"}>
                    <Input name={"surveyTitle"} onChange={handleChange} />
                </Label>

                <Label name={"Survey Description"}>
                    <Input name={"surveyDescription"} onChange={handleChange} />
                </Label>

                <Label name={"Select Research Category"}>
                    <Select
                        name={"category"}
                        value={surveyData.category}
                        onChange={handleChange}
                    >
                        {categories.map((item) => (
                            <option
                                key={item.category_id}
                                value={item.category_id}
                            >
                                {item.category_name}
                            </option>
                        ))}
                    </Select>
                </Label>

                <Label name={"Loyalty Points"}>
                    <input
                        type="number"
                        name="loyaltyPoint"
                        onChange={handleChange}
                        onKeyDown={(event) => removeForbiddenChars(event)}
                        onPaste={(event) => removeForbiddenChars(event)}
                        className="bg-[#F6F6F6] border border-[#858585] rounded-xl py-2 px-5 h-fit w-2/3"
                        required
                    />
                </Label>
            </div>

            <div className="flex flex-col gap-6">
                <span className="font-semibold text-xl">Upload Image</span>
                <div
                    className={`transition flex flex-col gap-6 items-center justify-center py-6 border-dashed border-2 border-black rounded-xl ${
                        isDragging ? "bg-white border-secondary" : ""
                    }`}
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={(e) => handleDragover(e)}
                    onDragEnter={(e) => handleDragEnter(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                >
                    <img src={upload} className="w-12" />
                    <div className="flex gap-2">
                        <span
                            className={`font-semibold text-xl text-secondary`}
                        >
                            Drag & Drop
                        </span>
                        <span className="font-semibold text-xl">Image</span>
                    </div>
                    <div className="font-medium flex gap-2">
                        <span>Or</span>
                        <span
                            className={`text-secondary cursor-pointer hover:text-primary underline`}
                            onClick={() => imgRef.current.click()}
                        >
                            browse files
                        </span>
                        <span>
                            on your computer
                            {surveyData.surveyImg
                                ? `(${surveyData.surveyImg.name})`
                                : null}
                        </span>
                    </div>
                </div>

                <input
                    onChange={handleChange}
                    ref={imgRef}
                    type="file"
                    accept="image/*"
                    name="surveyImg"
                    hidden
                />
            </div>

            <div className="flex gap-16">
                <UserCount type={"total"} count={userCount} />
                <UserCount type={"filter"} count={filterdUserCount} />
            </div>

            <Filters
                filters={filters}
                profileData={profileData}
                setProfileData={setProfileData}
                setFilteredUserCount={setFilteredUserCount}
            />

            <div className="flex gap-4">
                {filters.length > 0 ? (
                    <button
                        className="btn-primary bg-accent w-fit"
                        onClick={getFilterCount}
                    >
                        Get User Count
                    </button>
                ) : null}

                <button className="btn-primary w-fit" onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    );
}
