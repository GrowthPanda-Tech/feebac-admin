import { useState } from "react";

import makeRequest from "../../../utils/makeRequest";

import LayoutInput from "./helperComponents/LayoutInput";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SectionContainer from "./helperComponents/SectionContainer";
import SubmitButton from "../helperComponents/SubmitButton";

export default function SixthLayout({ parent, setPages }) {
    const [layout, setLayout] = useState({
        parent,
        pageType: 6,
        title: "",
        section: [
            { sectionTitle: "", sectionDesc: "" },
            { sectionTitle: "", sectionDesc: "" },
        ],
    });

    const handleChange = (e, index) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "sectionTitle" || name === "sectionDesc") {
            const updatedLayout = { ...layout };
            updatedLayout.section[index][name] = value;

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

            {layout.section.map((_, index) => (
                <SectionContainer key={index}>
                    <LayoutInput
                        handleChange={(e) => handleChange(e, index)}
                        label={`Title ${index + 1}`}
                        name={"sectionTitle"}
                    />
                    <LayoutTextArea
                        handleChange={(e) => handleChange(e, index)}
                        label={`Description ${index + 1}`}
                        name={"sectionDesc"}
                    />
                </SectionContainer>
            ))}

            <SubmitButton handleSubmit={handleSubmit} />
        </>
    );
}
