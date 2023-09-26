import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";
import NewsForm from "./NewsForm";
import PageTitle from "../PageTitle";

export default function NewsCreate() {
    const navigate = useNavigate();
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [newsData, setNewsData] = useState({});

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

    const handleSubmit = async (event) => {
        const formdata = new FormData();

        formdata.append("title", newsData.title);
        formdata.append("description", newsData.description);
        formdata.append("newsUrl", newsData.newsUrl);
        formdata.append("category", newsData.category);
        formdata.append(
            "newsImage",
            newsData.newsImage,
            newsData.newsImage.name
        );

        try {
            const response = await formSubmit(
                event,
                "news/create-news",
                "POST",
                formdata
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            alert(response.message);
            navigate("/news");
        } catch (error) {
            alert(error);
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
                        />
                        <button className="btn-primary w-fit mt-8">
                            <i className="fa-solid fa-floppy-disk mr-2"></i>
                            Publish
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
