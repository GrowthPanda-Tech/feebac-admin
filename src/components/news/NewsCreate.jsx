import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

import makeRequest from "../../utils/makeRequest";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

//components
import NewsForm from "./NewsForm";
import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";

export default function NewsCreate() {
    const navigate = useNavigate();

    const { categories } = useContext(CategoryContext);

    const [isSaving, setIsSaving] = useState(false);
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [newsData, setNewsData] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "news_image") {
            const file = event.target.files[0];
            setNewsData({ ...newsData, [name]: file });

            const reader = new FileReader();
            reader.onload = () => setImgPreview(reader.result);
            reader.readAsDataURL(file);

            return;
        }

        setNewsData({ ...newsData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const categoryId = newsData.category
            ? newsData.category
            : categories[0].category_id;

        const formdata = new FormData();

        formdata.append("title", newsData.title);
        formdata.append("description", newsData.description);
        formdata.append("source_url", newsData.source_url);
        formdata.append("category", categoryId);
        formdata.append("caption", newsData.caption);
        formdata.append(
            "news_image",
            newsData.news_image,
            newsData.news_image.name
        );

        try {
            setIsSaving(true);

            const response = await makeRequest(
                "news/create-news",
                "POST",
                formdata
            );

            if (response.isSuccess) {
                AlertComponent("success", response);
                setTimeout(() => {
                    navigate("/news");
                }, 2000);
            } else {
                AlertComponent("failed", response);
                throw new Error(response.message);
            }

            // alert(response.message);
        } catch (error) {
            console.log(error);
            AlertComponent("error", "", error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Create News"} />

            <div className="flex gap-8">
                <div className="w-3/4">
                    <form onSubmit={handleSubmit}>
                        <NewsForm
                            newsData={newsData}
                            handleChange={handleChange}
                            isSaving={isSaving}
                        />
                        <button
                            type="submit"
                            className={` ${
                                isSaving ? "btn-secondary" : "btn-primary"
                            } w-fit mt-8`}
                        >
                            <i className="fa-solid fa-floppy-disk mr-2"></i>
                            {isSaving ? "Publishing" : "Publish"}
                        </button>
                    </form>
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img src={imgPreview} className="max-h-full max-w-full" />
                </div>
            </div>
        </div>
    );
}
