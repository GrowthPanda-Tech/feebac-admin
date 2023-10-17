import { useState } from "react";
import LayoutInput from "./helperComponents/LayoutInput";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";

export default function FourthLayout({ parent }) {
    const [layout, setLayout] = useState({
        parent,
        pageType: 4,
        title: "",
        image: "",
        description: "",
        description2: "",
    });

    return (
        <>
            <LayoutInput name={"title"} />
            <ImageDragDrop name={"image"} />
            <LayoutTextArea name={"description"} />
            <LayoutTextArea name={"description2"} label={"description 2"} />
        </>
    );
}
