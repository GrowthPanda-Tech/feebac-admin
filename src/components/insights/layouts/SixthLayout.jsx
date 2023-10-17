import { useState } from "react";

import LayoutInput from "./helperComponents/LayoutInput";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SectionContainer from "./helperComponents/SectionContainer";

export default function SixthLayout({ parent }) {
    const [layout, setLayout] = useState({
        parent,
        pageType: 6,
        title: "",
        section: [
            { title: "", description: "" },
            { title: "", description: "" },
        ],
    });

    return (
        <>
            <LayoutInput name={"title"} />
            {layout.section.map((section, index) => (
                <SectionContainer>
                    <LayoutInput label={`Title ${index + 1}`} />
                    <LayoutTextArea label={`Description ${index + 1}`} />
                </SectionContainer>
            ))}
        </>
    );
}
