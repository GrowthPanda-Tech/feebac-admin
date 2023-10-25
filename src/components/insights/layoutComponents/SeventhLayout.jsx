import { useState } from "react";

import LayoutInput from "./helperComponents/LayoutInput";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SectionContainer from "./helperComponents/SectionContainer";

export default function SeventhLayout({ parent }) {
    const [layout, setLayout] = useState({
        parent,
        pageType: 7,
        title: "",
        image: "",
        section: { sectionTitle: "", sectionDesc: "" },
    });

    const handleChange = (e, index) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "sectionTitle" || name === "sectionDesc") {
            const updatedLayout = { ...layout };
            updatedLayout.section[name] = value;

            setLayout(updatedLayout);
            return;
        }

        setLayout({ ...layout, [name]: value });
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
            <ImageDragDrop name={"image"} />
            <LayoutTextArea name={"description"} handleChange={handleChange} />

            <SectionContainer>
                <LayoutInput
                    label={"Section Title"}
                    name={"sectionTitle"}
                    handleChange={handleChange}
                />
                <LayoutTextArea
                    label={"Section Description"}
                    name={"sectionDesc"}
                    handleChange={handleChange}
                />
            </SectionContainer>
        </>
    );
}
