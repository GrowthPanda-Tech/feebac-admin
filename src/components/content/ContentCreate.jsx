import { useState, useEffect } from "react";
import ContentForm from "./ContentForm";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

export default function ContentCreate() {
    const [categories, setCategories] = useState([]);
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);

    const getCategories = async () => {
        const response = await makeRequest("site-admin/get-all-category");
        if (response.isSuccess) {
            setCategories(response.categoryList);
        }
    };

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
        const formData = new FormData();
        formData.append("articleTitle", articleData.article_title);
        formData.append("articleDesctiption", articleData.article_desctiption);
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
        alert(response.message);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <h1 className="heading"> Create New Article </h1>
            <div className="flex gap-8">
                <div className="w-3/4">
                    <ContentForm
                        articleData={articleData}
                        handleChange={handleChange}
                        handleEditorChange={handleEditorChange}
                    />
                    <button
                        className="btn-primary w-fit mt-8"
                        onClick={handleSubmit}
                    >
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        Save Draft
                    </button>
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img src={imgPreview} className="max-h-full max-w-full" />
                </div>
            </div>
        </>
    );
}
