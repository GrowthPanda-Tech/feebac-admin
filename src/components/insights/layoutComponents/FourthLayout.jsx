import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";
import getInsightImgUrl from "../../../utils/getInsightImgUrl";

import LayoutInput from "./helperComponents/LayoutInput";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SubmitButton from "../helperComponents/SubmitButton";

export default function FourthLayout({ parent, setPages }) {
    const [layout, setLayout] = useState({
        parent,
        pageType: 4,
        title: "",
        image: "",
        description: "",
        description2: "",
    });

    const handleChange = async (e) => {
        if (e.target.name === "image") {
            e.preventDefault();

            const image = e.target.files[0];
            const formData = new FormData();
            formData.append("image", image);

            try {
                const url = await getInsightImgUrl(formData);
                setLayout({ ...layout, image: url });
            } catch (error) {
                console.error(error);
            }

            return;
        }

        setLayout({ ...layout, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await makeRequest(
                "insights/add-insights-pages",
                "POST",
                layout
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            setPages((prev) => [...prev, layout]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <LayoutInput name={"title"} handleChange={handleChange} />
            <ImageDragDrop name={"image"} handleChange={handleChange} />
            <LayoutTextArea name={"description"} handleChange={handleChange} />
            <LayoutTextArea
                name={"description2"}
                label={"description 2"}
                handleChange={handleChange}
            />
            <SubmitButton handleSubmit={handleSubmit} />
        </>
    );
}
