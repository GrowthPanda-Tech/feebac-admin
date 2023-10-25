import { useState, useContext, useEffect } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import submitLayout from "../../../utils/submitLayout";

import LayoutInput from "./helperComponents/LayoutInput";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SectionContainer from "./helperComponents/SectionContainer";
import SubmitButton from "../helperComponents/SubmitButton";

export default function SixthLayout() {
    const { pages, setPages, state } = useContext(PageContext);

    const insightId = sessionStorage.getItem("insightId");
    const initLayout = {
        parent: insightId,
        pageType: 6,
        title: "",
        section: [
            { sectionTitle: "", sectionDesc: "" },
            { sectionTitle: "", sectionDesc: "" },
        ],
    };
    const [layout, setLayout] = useState(initLayout);

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

    useEffect(() => {
        if (state.data) {
            setLayout(state.data);
        } else {
            setLayout(initLayout);
        }
    }, [state.data]);

    return (
        <>
            <LayoutInput
                name={"title"}
                value={layout.title}
                handleChange={handleChange}
            />

            {layout.section.map((sec, index) => (
                <SectionContainer key={index}>
                    <LayoutInput
                        handleChange={(e) => handleChange(e, index)}
                        label={`Title ${index + 1}`}
                        name={"sectionTitle"}
                        value={sec.sectionTitle}
                    />
                    <LayoutTextArea
                        handleChange={(e) => handleChange(e, index)}
                        label={`Description ${index + 1}`}
                        name={"sectionDesc"}
                        value={sec.sectionDesc}
                    />
                </SectionContainer>
            ))}

            <SubmitButton
                handleSubmit={() =>
                    submitLayout(layout, state.index, pages, setPages)
                }
            />
        </>
    );
}
