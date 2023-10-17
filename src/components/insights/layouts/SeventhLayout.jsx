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
        section: [{ title: "", description: "" }],
    });

    return (
        <>
            <LayoutInput name={"title"} />
            <ImageDragDrop name={"image"} />
            <LayoutTextArea name={"description"} />

            <SectionContainer>
                <LayoutInput label={"Section Title"} />
                <LayoutTextArea label={"Section Description"} />
            </SectionContainer>
        </>
    );
}
