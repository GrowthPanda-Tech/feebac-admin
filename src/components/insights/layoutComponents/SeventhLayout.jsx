import { useState, useContext, useEffect } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import submitLayout from "../../../utils/submitLayout";

import LayoutInput from "./helperComponents/LayoutInput";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SectionContainer from "./helperComponents/SectionContainer";
import SubmitButton from "../helperComponents/SubmitButton";

export default function SeventhLayout() {
    const { pages, setPages, state } = useContext(PageContext);

    const insightId = sessionStorage.getItem("insightId");
    const initLayout = {
        parent: insightId,
        pageType: 7,
        title: "",
        image: "",
        description: "",
        section: { sectionTitle: "", sectionDesc: "" },
    };

    const [layout, setLayout] = useState(initLayout);

    const handleChange = (e) => {
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

    const getImgUrl = async (e) => {
        e.preventDefault();

        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await makeRequest(
                "insights/upload-insights-images",
                "POST",
                formData
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const updatedLayout = { ...layout };
            updatedLayout.image = response.data;

            setLayout(updatedLayout);
        } catch (error) {
            console.error(error);
        }
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

            <ImageDragDrop name={"image"} handleChange={getImgUrl} />

            <LayoutTextArea
                name={"description"}
                value={layout.description}
                handleChange={handleChange}
            />

            <SectionContainer>
                <LayoutInput
                    label={"Title"}
                    name={"sectionTitle"}
                    value={layout.section.sectionTitle}
                    handleChange={handleChange}
                />
                <LayoutTextArea
                    label={"Description"}
                    name={"sectionDesc"}
                    value={layout.section.sectionDesc}
                    handleChange={handleChange}
                />
            </SectionContainer>

            <SubmitButton
                handleSubmit={() =>
                    submitLayout(layout, state.index, pages, setPages)
                }
            />
        </>
    );
}
