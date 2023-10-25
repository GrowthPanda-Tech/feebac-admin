import { useState } from "react";

import LayoutInput from "./helperComponents/LayoutInput";
import SectionContainer from "./helperComponents/SectionContainer";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";

export default function EighthLayout({ parent }) {
    const [layout, setLayout] = useState({
        parent,
        pageType: 8,
        title: "",
        image: "",
        section: [
            { image: "", title: "", description: "" },
            { title: "", description: "" },
        ],
    });

    return (
        <>
            <LayoutInput name={"title"} />

            <SectionContainer>
                <ImageDragDrop name={"image"} />
                <LayoutInput name={"title"} />
                <LayoutTextArea name={"description"} />
            </SectionContainer>

            <SectionContainer>
                <LayoutInput name={"title"} />
                <LayoutTextArea name={"description"} />
            </SectionContainer>
        </>
    );
}
