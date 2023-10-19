import { useState, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

//components
import PageTitle from "../PageTitle";
import FormInput from "../_helperComponents/FormInput";
import FormSelect from "../_helperComponents/FormSelect";
import LayoutFactory from "./LayoutFactory";

//lord save me
import first from "../../assets/insight-templates/01.png";
import second from "../../assets/insight-templates/02.png";
import third from "../../assets/insight-templates/03.png";
import fourth from "../../assets/insight-templates/04.png";
import fifth from "../../assets/insight-templates/05.png";
import sixth from "../../assets/insight-templates/06.png";
import seventh from "../../assets/insight-templates/07.png";
import eighth from "../../assets/insight-templates/08.png";
import ImageInput from "./helperComponents/ImageInput";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CREATE_URL = `${BASE_URL}/insights/create-insights`;
const TEMPLATES = [first, second, third, fourth, fifth, sixth, seventh, eighth];

export default function Insights() {
    const { categories } = useContext(CategoryContext);

    const [insightId, setInsightId] = useState(null);
    const [activeLayout, setActiveLayout] = useState(1);
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

    const handleCreate = async (e) => {
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

        const request = {
            method: "POST",
            body: formData,
            headers: {
                authToken: localStorage.getItem("authToken"),
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

            setInsightId(json.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Insights"} />

            <form className="flex flex-col gap-8" onSubmit={handleCreate}>
                <div className="flex w-full justify-between gap-14">
                    <FormInput name={"title"} handleChange={handleChange} />

                    <FormSelect name={"category"} handleChange={handleChange}>
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

                <FormInput
                    name={"insightsImage"}
                    label={"Background Image"}
                    type={"file"}
                    handleChange={handleChange}
                />

                <button type="submit">Create</button>
            </form>

            <div className="flex flex-col gap-5">
                <span className="font-semibold text-lg capitalize">
                    Choose Your Template
                </span>

                <div className="flex justify-between">
                    {TEMPLATES.map((template, index) => (
                        <img
                            src={template}
                            key={index}
                            className={`w-40 transition cursor-pointer rounded-lg ${activeLayout === index + 1
                                    ? "border-2 border-accent"
                                    : ""
                                }`}
                            onClick={() => setActiveLayout(index + 1)}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-white flex flex-col rounded-xl p-10 gap-7">
                <LayoutFactory parent={insightId} activeLayout={activeLayout} />
            </div>
        </div>
    );
}
