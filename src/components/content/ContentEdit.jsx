import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentForm from "./ContentForm";
import makeRequest from "../../utils/makeRequest";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";
import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ContentEdit() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [articleData, setArticleData] = useState({
        category: { category_id: null },
    });
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [imgUpdate, setImgUpdate] = useState({
        isUpdate: false,
        articleImg: null,
    });

    const getArticleInfo = async () => {
        const response = await makeRequest(
            `site-admin/show-article-info?articleId=${slug}`,
            "GET"
        );
        response.isSuccess
            ? setArticleData(response.articleInfo)
            : alert(response.message);
    };

    const handleChange = (event) => {
        if (event.target.name === "articleImg") {
            const file = event.target.files[0];
            setImgUpdate({ isUpdate: true, articleImg: file });

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
            formData.append("articleId", articleData.article_id);
            formData.append("articleTitle", articleData.article_title);
            formData.append(
                "articleDesctiption",
                articleData.article_desctiption
            );
            formData.append("articleContent", articleData.article_content);
            formData.append("category", articleData.category);
            formData.append("isUpdateImage", imgUpdate.isUpdate);

            if (imgUpdate.isUpdate) {
                formData.append(
                    "articleImg",
                    imgUpdate.articleImg,
                    imgUpdate.articleImg.name
                );
            }

            const response = await formSubmit(
                event,
                "/site-admin/update-article",
                "PUT",
                formData
            );

            if (response.isSuccess) {
                AlertComponent("success", response);
                setTimeout(() => {
                    navigate("/content");
                }, 3200);
            } else AlertComponent("failed", response);
        } catch (error) {
            AlertComponent("error", error);
        }
    };

    useEffect(() => {
        getArticleInfo();
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Edit Article"} />
            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="md:w-3/4">
                    <ContentForm
                        articleData={articleData}
                        handleChange={handleChange}
                        handleEditorChange={handleEditorChange}
                    />

                    <button
                        onClick={handleSubmit}
                        className="btn-primary w-fit mt-8"
                    >
                        <i className="fa-solid fa-pen-to-square mr-2"></i>
                        Edit
                    </button>
                </div>

                <div className="md:w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img
                        src={
                            articleData.image_url
                                ? BASE_URL + articleData.image_url
                                : imgPreview
                        }
                        className="max-h-full max-w-full"
                    />
                </div>
            </div>
        </div>
    );
}
