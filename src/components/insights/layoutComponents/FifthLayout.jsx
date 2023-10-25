import { useState } from "react";

import makeRequest from "../../../utils/makeRequest";
import getInsightImgUrl from "../../../utils/getInsightImgUrl";

import LayoutInput from "./helperComponents/LayoutInput";
import SectionContainer from "./helperComponents/SectionContainer";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SubmitButton from "../helperComponents/SubmitButton";

export default function FifthLayout({ parent, setPages }) {
    const initSections = { sectionImg: "", sectionDesc: "" };

    const [layout, setLayout] = useState({
        parent,
        pageType: 5,
        title: "",
        section: [{ ...initSections }],
    });

    const handleSectionAdd = () => {
        const updatedLayout = { ...layout };
        updatedLayout.section.push(initSections);

        setLayout(updatedLayout);
    };

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

    const getImgUrl = async (e, index) => {
        e.preventDefault();

        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        try {
            const url = await getInsightImgUrl(formData);

            const updatedLayout = { ...layout };
            updatedLayout.section[index].sectionImg = url;

            setLayout(updatedLayout);
        } catch (error) {
            console.error(error);
        }
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
            <LayoutInput name={"title"} />

            <button
                className="bg-[#E6E6E6] px-8 py-2 rounded-2xl w-fit"
                onClick={handleSectionAdd}
            >
                <i className="fa-solid fa-plus"></i>
            </button>

            {layout.section.map((_, index) => (
                <SectionContainer key={index}>
                    <h2 className="text-[#EA8552] font-semibold text-xl">
                        Section {index + 1}
                    </h2>

                    <ImageDragDrop
                        name={"sectionImg"}
                        handleChange={(e) => getImgUrl(e, index)}
                    />

                    <LayoutTextArea
                        name={"sectionDesc"}
                        label={"description"}
                        handleChange={(e) => handleChange(e, index)}
                    />
                </SectionContainer>
            ))}

            <SubmitButton handleSubmit={handleSubmit} />
        </>
    );
}
