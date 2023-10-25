import { useState, useContext, useEffect } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import makeRequest from "../../../utils/makeRequest";
import submitLayout from "../../../utils/submitLayout";

import LayoutInput from "./helperComponents/LayoutInput";
import SectionContainer from "./helperComponents/SectionContainer";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SubmitButton from "../helperComponents/SubmitButton";

export default function EighthLayout() {
    const { pages, setPages, state } = useContext(PageContext);

    const insightId = sessionStorage.getItem("insightId");
    const initLayout = {
        parent: insightId,
        pageType: 8,
        title: "",
        section: [
            { sectionImg: "", sectionTitle: "", sectionDesc: "" },
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
            updatedLayout.section[0].sectionImg = response.data;

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

            <SectionContainer>
                <ImageDragDrop name={"image"} handleChange={getImgUrl} />
                <LayoutInput
                    name={"sectionTitle"}
                    value={layout.section[0].sectionTitle}
                    label={"Title 1"}
                    handleChange={(e) => {
                        handleChange(e, 0);
                    }}
                />
                <LayoutTextArea
                    name={"sectionDesc"}
                    value={layout.section[0].sectionDesc}
                    label={"Description 1"}
                    handleChange={(e) => {
                        handleChange(e, 0);
                    }}
                />
            </SectionContainer>

            <SectionContainer>
                <LayoutInput
                    name={"sectionTitle"}
                    value={layout.section[1].sectionTitle}
                    label={"Title 2"}
                    handleChange={(e) => {
                        handleChange(e, 1);
                    }}
                />
                <LayoutTextArea
                    name={"sectionDesc"}
                    value={layout.section[1].sectionDesc}
                    label={"Description 2"}
                    handleChange={(e) => {
                        handleChange(e, 1);
                    }}
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
