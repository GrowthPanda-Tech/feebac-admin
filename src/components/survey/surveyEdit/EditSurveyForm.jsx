import { useState, useEffect } from "react";
import Filters from "../createSurvey/filter/Filters";
import makeRequest from "../../../utils/makeRequest";
import convertToUTC from "../../../utils/convertToUTC";
import formSubmit from "../../../utils/formSubmit";
import { useNavigate, useParams } from "react-router-dom";

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
    // console.log(children);
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
    const navigate = useNavigate();
    const { slug } = useParams();
    const [surveyId, setSurveyId] = useState(surveyInfo.surveyId);
    const [surveyTitle, setSurveyTitle] = useState();
    const [isSurveyCreate, setIsSurveyCreate] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [surveyData, setSurveyData] = useState({
        surveyId: surveyInfo?.survey_id,
        surveyTitle: surveyInfo?.survey_title,
        startDate: surveyInfo?.created_date,
        endDate: surveyInfo?.end_date,
        loyaltyPoint: surveyInfo?.loyalty_point,
        surveyDescription: surveyInfo?.survey_description,
        category: surveyInfo?.category.category_id,
        isUpdateImage: false,
    });
    const [profileData, setProfileData] = useState({});
    console.log(surveyData);
    console.log(surveyInfo);
    console.log(surveyData.startDate.split("/").join("-"));
    const getCategories = async () => {
        const response = await makeRequest(
            "site-admin/get-all-category",
            "GET"
        );
        response.isSuccess && setCategories(response.categoryList);
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
            "site-admin/update-survey",
            "PUT",
            formdata
        );
        alert(response.message);

        if (response.isSuccess) {
            const getData = async () => {
                const response = await makeRequest(
                    `survey/show-survey?sid=${slug}`,
                    "GET"
                );
                if (response.isSuccess) {
                    // setQuestionList(response.questionList);
                    setSurveyInfo(response.surveyInfo);
                }
            };
            getData();

            setSurveyEditPop(false);
        }
    };

    // {
    //     isSurveyCreate &&
    //         setTimeout(() => {
    //             navigate(`/survey/create/add-questions/${surveyId}`, {
    //                 state: {
    //                     surveyId: surveyId,
    //                     surveyTitle: surveyTitle,
    //                 },
    //             });
    //             setIsSurveyCreate(false);
    //         }, 1000);
    // }

    useEffect(() => {
        getCategories();
    }, []);

    console.log(surveyData.category);
    return (
        <div className="flex flex-col p-8 gap-8">
            <h1 className="heading mb-0"> Edit Survey Details </h1>

            <div className="grid grid-cols-3 gap-8 ">
                <Label name={"Start Date"}>
                    <Input
                        type={"datetime-local"}
                        min={TODAY}
                        value={
                            surveyData
                                ? surveyData?.startDate
                                      .replace(/ /g, "T")
                                      .split("/")
                                      .join("-")
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
                            surveyData
                                ? surveyData?.endDate
                                      .replace(/ /g, "T")
                                      .split("/")
                                      .join("-")
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
