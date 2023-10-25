import { useState, useEffect, useContext } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import makeRequest from "../../../utils/makeRequest";
import submitLayout from "../../../utils/submitLayout";

import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import SubmitButton from "../helperComponents/SubmitButton";
import LayoutInput from "./helperComponents/LayoutInput";
import LayoutTextArea from "./helperComponents/LayoutTextArea";

//used in 1, 2
export default function DefaultLayout() {
    const { pages, setPages, state } = useContext(PageContext);

    const insightId = sessionStorage.getItem("insightId");
    const initLayout = {
        parent: insightId,
        pageType: state.pageType,
        title: "",
        image: "",
        description: "",
    };

    const [layout, setLayout] = useState(initLayout);

    const handleChange = (e) => {
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

    //TODO: can i get rid of this effect?
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

            <SubmitButton
                handleSubmit={() =>
                    submitLayout(layout, state.index, pages, setPages)
                }
            />
        </>
    );
}
