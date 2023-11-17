import { useState, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

import swal from "../../utils/swal";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

//components
import NewsForm from "./NewsForm";
import PageTitle from "../PageTitle";

export default function NewsCreate() {
    const navigate = useNavigate();
    const { categories } = useContext(CategoryContext);
    const initCat = categories[0]?.category_id ? categories[0].category_id : "";
    const [isSaving, setIsSaving] = useState(false);

    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [newsData, setNewsData] = useState({
        category: initCat,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "newsImage") {
            const file = event.target.files[0];
            setNewsData({ ...newsData, newsImage: file });

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImgPreview(reader.result);
                reader.readAsDataURL(file);
            }

            return;
        }
        setNewsData({ ...newsData, [name]: value });
    };

    const handleSubmit = async (event) => {
        const formdata = new FormData();

        for (const [key, value] of Object.entries(newsData)) {
            if (key === "newsImage") {
                formdata.append(
                    "newsImage",
                    newsData.newsImage,
                    newsData.newsImage.name
                );

                continue;
            }

            formdata.append(key, value);
        }

        try {
            setIsSaving(true);

            const response = await formSubmit(
                event,
                "news/create-news",
                "POST",
                formdata
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            swal("success", response.message);
            navigate("/news");
        } catch (error) {
            swal("error", error.message);
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
