import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

//components
import NewsForm from "./NewsForm";
import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function NewsEdit() {
    const location = useLocation();
    const { from } = location.state;

    const [newsData, setNewsData] = useState({});
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [imgUpdate, setImgUpdate] = useState(false);

    const editHandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "newsImage") {
            const file = event.target.files[0];
            setNewsData({ ...newsData, newsImage: file });
            setImgUpdate(true);

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImgPreview(reader.result);
                reader.readAsDataURL(file);
            }

            return;
        }

        if (name === "description") {
            const maxWords = 60;
            const words = value.split(" ");

            if (words.length <= maxWords) {
                setNewsData({ ...newsData, description: value });
            }

            return;
        }

        setNewsData({ ...newsData, [name]: value });
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            setNewsData(from);
        }

        return () => {
            ignore = true;
        };
    }, []);

    const handleSubmit = async (event) => {
        console.log("hii");
        const formdata = new FormData();

        formdata.append("id", newsData.id);
        formdata.append("title", newsData.title);
        formdata.append("description", newsData.description);
        formdata.append("newsUrl", newsData.newsUrl);
        formdata.append("category", newsData.category);
        if (imgUpdate) {
            formdata.append(
                "newsImage",
                newsData.newsImage,
                newsData.newsImage.name
            );
        }

        try {
            const response = await formSubmit(
                event,
                "news/edit-news",
                "PUT",
                formdata
            );

            if (response.isSuccess) {
                AlertComponent("success", response);
                // setTimeout(() => {
                //     navigate("/news");
                // }, 3100);
            } else {
                AlertComponent("failed", response);
            }
        } catch (error) {
            AlertComponent("error", error);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Edit News"} />
            <div className="flex gap-8">
                <div className="w-3/4">
                    <NewsForm
                        newsData={newsData}
                        handleChange={editHandleChange}
                    />

                    <button
                        className="btn-primary w-fit mt-8"
                        onClick={handleSubmit}
                    >
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        Save Changes
                    </button>
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img
                        src={
                            newsData ? BASE_URL + newsData.imageUrl : imgPreview
                        }
                        className="max-h-full max-w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default NewsEdit;
