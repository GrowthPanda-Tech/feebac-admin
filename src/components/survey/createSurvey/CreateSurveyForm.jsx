import { useState, useEffect } from "react";
import Filters from "./filter/Filters";
import makeRequest from "../../../utils/makeRequest";
import convertToUTC from "../../../utils/convertToUTC";
import formSubmit from "../../../utils/formSubmit";
import PageTitle from "../../PageTitle";
import { useContext } from "react";
import { CategoryContext } from "../../../contexts/CategoryContext";

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
    const [filters, setFilters] = useState([]);
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [surveyData, setSurveyData] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [userCount, setUserCount] = useState(0);
    const [filterdUserCount, setFilteredUserCount] = useState(0);

    const { categories } = useContext(CategoryContext);

    const getFilters = async () => {
        const response = await makeRequest(
            "config/get-profile-key-value",
            "GET"
        );
        response.isSuccess
            ? setFilters(response.data)
            : alert(response.message);
    };

    const getUserCount = async () => {
        const response = await makeRequest(
            "site-admin/get-target-profile-count?target={}",
            "GET"
        );
        setUserCount(response.data);
    };

    const getFilterCount = async () => {
        const filterCount = JSON.stringify(profileData);
        const response = await makeRequest(
            `site-admin/get-target-profile-count?target=${filterCount}`,
            "GET"
        );
        setFilteredUserCount(response.data);
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

    const handleSubmit = async (event) => {
        const dataString = JSON.stringify(profileData);
        const formdata = new FormData();

        for (const [key, value] of Object.entries(surveyData)) {
            formdata.append(key, value);
        }

        formdata.append("target", dataString);

        const response = await formSubmit(
            event,
            "site-admin/create-survey",
            "POST",
            formdata
        );
        alert(response.message);

        if (response.isSuccess) {
            setSurveyId(response.surveyId);
            setSurveyTitle(surveyData.surveyTitle);
            setIsSurveyCreate(response.isSuccess);
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
                    <Select name={"category"} onChange={handleChange}>
                        <option value={null}>-- Categories --</option>
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

                <Label name={"Loyalty Points Per Use"}>
                    <Input
                        type={"number"}
                        name={"loyaltyPoint"}
                        onChange={handleChange}
                    />
                </Label>
            </div>

            <div className="flex gap-16">
                <UserCount type={"total"} count={userCount} />
                <UserCount type={"filter"} count={filterdUserCount} />
            </div>

            {isShowFilter && (
                <Filters
                    filters={filters}
                    profileData={profileData}
                    setProfileData={setProfileData}
                    setFilteredUserCount={setFilteredUserCount}
                />
            )}

            <div className="flex gap-4">
                {!isShowFilter ? (
                    <button
                        className="btn-primary bg-accent w-fit"
                        onClick={() => setIsShowFilter(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Add Filters
                    </button>
                ) : (
                    <button
                        className="btn-primary bg-accent w-fit"
                        onClick={() => getFilterCount()}
                    >
                        Confirm Filters
                    </button>
                )}
                <button className="btn-primary w-fit" onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    );
}
