import { useState, useContext } from "react";
import { CategoryContext } from "../../../contexts/CategoryContext";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

//components
import FormInput from "../../_helperComponents/FormInput";
import FormSelect from "../../_helperComponents/FormSelect";
import SubmitButton from "../helperComponents/SubmitButton";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";

export default function InsightCreate({ setInsightId }) {
    const { categories } = useContext(CategoryContext);

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

        formData.append("title", insight.title);
        formData.append(
            "category",
            insight.category === ""
                ? categories[0].category_id
                : insight.category
        );
        formData.append(
            "insightsImage",
            insight.insightsImage,
            insight.insightsImage.name
        );

        try {
            const response = await makeRequest(
                "insights/create-insights",
                "POST",
                formData
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const id = response.data;

            setInsightId(id);
            sessionStorage.setItem("insightId", id);

            swal("success", response.message);
        } catch (error) {
            swal("error", error.message);
        }
    };

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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

            <ImageDragDrop name={"insightsImage"} handleChange={handleChange} />

            <SubmitButton insight />
        </form>
    );
}
