import { useState, useContext, useEffect } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import makeRequest from "../../../utils/makeRequest";
import submitLayout from "../../../utils/submitLayout";

import LayoutInput from "./helperComponents/LayoutInput";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SubmitButton from "../helperComponents/SubmitButton";

export default function FourthLayout() {
    const { pages, setPages, state } = useContext(PageContext);

    const insightId = sessionStorage.getItem("insightId");
    const initLayout = {
        parent: insightId,
        pageType: 4,
        title: "",
        image: "",
        description: "",
        description2: "",
    };

    const [layout, setLayout] = useState(initLayout);

    const handleChange = async (e) => {
        setLayout({ ...layout, [e.target.name]: e.target.value });
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

            setLayout({ ...layout, image: response.data });
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

            <LayoutTextArea
                name={"description2"}
                value={layout.description2}
                label={"description 2"}
                handleChange={handleChange}
            />

            <SubmitButton
                handleSubmit={() =>
                    submitLayout(layout, state.index, pages, setPages)
                }
            />
        </>
    );
}
