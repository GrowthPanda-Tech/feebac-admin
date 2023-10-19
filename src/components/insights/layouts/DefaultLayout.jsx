import { useState } from "react";

import getInsightImgUrl from "../../../utils/getInsightImgUrl";

import LayoutInput from "./helperComponents/LayoutInput";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CREATE_PAGE_URL = `${BASE_URL}/insights/add-insights-pages`;
const AUTH_TOKEN = localStorage.getItem("authToken");

//used in 1, 2
export default function DefaultLayout({ parent, pageType, setPages }) {
    const [layout, setLayout] = useState({
        parent,
        pageType,
        title: "",
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        setLayout({ ...layout, [e.target.name]: e.target.value });
    };

    const getImgUrl = async (e) => {
        e.preventDefault();

        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        try {
            const url = await getInsightImgUrl(formData);
            setLayout({ ...layout, image: url });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        const request = {
            body: JSON.stringify(layout),
            method: "POST",
            headers: {
                authToken: AUTH_TOKEN,
            },
        };

        try {
            const response = await fetch(CREATE_PAGE_URL, request);

            if (response.status >= 500) {
                throw new Error(response.status);
            }

            const json = await response.json();

            if (!json.isSuccess) {
                throw new Error(response.message);
            }

            setPages((prev) => [...prev, layout]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <LayoutInput name={"title"} handleChange={handleChange} />
            <ImageDragDrop name={"image"} handleChange={getImgUrl} />
            <LayoutTextArea name={"description"} handleChange={handleChange} />
            <button onClick={handleSubmit}>Create Page</button>
        </>
    );
}
