import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";
import ContentForm from "./ContentForm";
import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";

export default function ContentCreate() {
    const navigate = useNavigate();
    const [articleData, setArticleData] = useState({
        category: {
            category_id: null,
        },
    });
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);

    const handleChange = (event) => {
        if (event.target.name === "articleImg") {
            const file = event.target.files[0];
            setArticleData({ ...articleData, [event.target.name]: file });

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImgPreview(reader.result);
                reader.readAsDataURL(file);
            }

            return;
        }

        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    };

    const handleEditorChange = (content) =>
        setArticleData({ ...articleData, article_content: content });

    const handleSubmit = async (event) => {
        try {
            const formData = new FormData();
            formData.append("articleTitle", articleData.article_title);
            formData.append(
                "articleDesctiption",
                articleData.article_desctiption
            );
            formData.append("articleContent", articleData.article_content);
            formData.append("category", articleData.category);
            articleData.articleImg &&
                formData.append(
                    "articleImg",
                    articleData.articleImg,
                    articleData.articleImg.name
                );

            const response = await formSubmit(
                event,
                "site-admin/create-article",
                "POST",
                formData
            );

            if (response.isSuccess) {
                AlertComponent("success", response);
                setTimeout(() => {
                    navigate("/content");
                }, 3200);
            } else AlertComponent("failed", response);
        } catch (error) {
            AlertComponent("error", "", error);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Create New Article"} />
            <div className="flex gap-8">
                <div className="w-3/4">
                    <form onSubmit={handleSubmit}>
                        <ContentForm
                            articleData={articleData}
                            handleChange={handleChange}
                            handleEditorChange={handleEditorChange}
                        />
                        <button className="btn-primary w-fit mt-8">
                            <i className="fa-solid fa-floppy-disk mr-2"></i>
                            Save Draft
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
