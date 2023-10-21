import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../PageTitle";
import FormInput from "../_helperComponents/FormInput";
import FormSelect from "../_helperComponents/FormSelect";
import ImageInput from "./helperComponents/ImageInput";
import LayoutFactory from "./LayoutFactory";
import PagePill from "./helperComponents/PagePill";
import SubmitButton from "./helperComponents/SubmitButton";

//lord save me
import first from "../../assets/insight-templates/01.png";
import second from "../../assets/insight-templates/02.png";
import third from "../../assets/insight-templates/03.png";
import fourth from "../../assets/insight-templates/04.png";
import fifth from "../../assets/insight-templates/05.png";
import sixth from "../../assets/insight-templates/06.png";
import seventh from "../../assets/insight-templates/07.png";
import eighth from "../../assets/insight-templates/08.png";

const AUTH_TOKEN = localStorage.getItem("authToken");
const BASE_URL = import.meta.env.VITE_BASE_URL;
const CREATE_URL = `${BASE_URL}/insights/create-insights`;
const TEMPLATES = [first, second, third, fourth, fifth, sixth, seventh, eighth];

export default function Insights() {
    const { categories } = useContext(CategoryContext);

    const initPages = JSON.parse(sessionStorage.getItem("insightPages"));

    const [pages, setPages] = useState(initPages ? initPages : []);
    const [activeLayout, setActiveLayout] = useState(1);

    const [insightId, setInsightId] = useState(
        sessionStorage.getItem("insightId")
    );
    const [insight, setInsight] = useState({
        title: "",
        description: "Test",
        category: "",
        insightsImage: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "insightsImage") {
            const image = e.target.files[0];
            setInsight({ ...insight, [name]: image });

            return;
        }

        setInsight({ ...insight, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const [key, value] of Object.entries(insight)) {
            if (key === "insightsImage") {
                formData.append(key, value, value.name);
                continue;
            }

            if (key === "category" && value === "") {
                formData.append(key, categories[0].category_id);
                continue;
            }

            formData.append(key, value);
        }

        //manual fetch calls all the way baby
        const request = {
            method: "POST",
            body: formData,
            headers: {
                authToken: AUTH_TOKEN,
            },
        };

        try {
            const response = await fetch(CREATE_URL, request);

            if (response.status >= 500) {
                throw new Error(response.status);
            }

            const json = await response.json();

            if (!json.isSuccess) {
                throw new Error(json.message);
            }

            const id = json.data;
            setInsightId(id);
            sessionStorage.setItem("insightId", id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInsightSubmit = async () => {
        try {
            const response = await makeRequest(
                "insights/toggle-insights-status",
                "PATCH",
                { id: insightId }
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            sessionStorage.clear();
            setInsightId(null);
            setPages([]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            sessionStorage.setItem("insightPages", JSON.stringify(pages));
        }

        return () => {
            ignore = true;
        };
    }, [pages]);

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Insights"} />

            {!insightId ? (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex w-full justify-between gap-14">
                        <FormInput name={"title"} handleChange={handleChange} />

                        <FormSelect
                            name={"category"}
                            handleChange={handleChange}
                        >
                            {categories.map((category) => (
                                <option
                                    key={category.category_id}
                                    value={category.category_id}
                                >
                                    {category.category_name}
                                </option>
                            ))}
                        </FormSelect>
                    </div>

                    <ImageInput handleChange={handleChange} />

                    <SubmitButton insight />
                </form>
            ) : (
                <>
                    <div className="flex flex-col gap-5">
                        <span className="font-semibold text-lg capitalize">
                            Choose Your Template
                        </span>

                        <div className="flex gap-8 justify-between overflow-x-scroll no-scrollbar">
                            {TEMPLATES.map((template, index) => (
                                <img
                                    src={template}
                                    key={index}
                                    className={`w-40 transition cursor-pointer rounded-lg ${activeLayout === index + 1
                                            ? "border-2 border-accent"
                                            : "border-[#1D1D1D] opacity-75"
                                        }`}
                                    onClick={() => setActiveLayout(index + 1)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {pages.map((page, index) => (
                            <PagePill
                                key={index}
                                index={index}
                                handleClick={() =>
                                    setActiveLayout(pages[index].pageType)
                                }
                            />
                        ))}
                    </div>

                    <div className="bg-white flex flex-col rounded-xl p-10 gap-7">
                        <LayoutFactory
                            parent={insightId}
                            activeLayout={activeLayout}
                            setPages={setPages}
                        />
                    </div>

                    <button onClick={handleInsightSubmit}>
                        Submit Insight
                    </button>
                </>
            )}
        </div>
    );
}
