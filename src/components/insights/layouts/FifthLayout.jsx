import { useState } from "react";

import LayoutInput from "./helperComponents/LayoutInput";
import SectionContainer from "./helperComponents/SectionContainer";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";

export default function FifthLayout({ parent }) {
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

    return (
        <>
            <LayoutInput name={"title"} />

            <button
                className="bg-[#E6E6E6] px-8 py-2 rounded-2xl w-fit"
                onClick={handleSectionAdd}
            >
                <i className="fa-solid fa-plus"></i>
            </button>

            {layout.section.map((section, index) => (
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
        </>
    );
}
