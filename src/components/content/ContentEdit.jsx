import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ContentForm from "./ContentForm";
import makeRequest from "../../utils/makeRequest";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

export default function ContentEdit() {
    const { slug } = useParams();
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const [articleData, setArticleData] = useState({ category: { category_id: null }, });
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);

    const getArticleInfo = async () => {
        const response = await makeRequest(`site-admin/show-article-info?articleId=${slug}`, 'GET');
        response.isSuccess ? setArticleData(response.articleInfo) : alert(response.message);
    }

    const handleInputChange = (e) => setArticleData({...articleData, [e.target.name]: e.target.value});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setArticleData({...articleData, [e.target.name]: file});

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleEditorChange = (content, editor) => setArticleData({ ...articleData, article_content: content });

    const handleSubmit = async (event) => {
        const formData = new FormData();
        formData.append('articleId', articleData.article_id);
        formData.append('articleTitle', articleData.article_title);
        formData.append('articleDesctiption', articleData.article_desctiption);
        formData.append('articleContent', articleData.article_content);
        formData.append('category', articleData.category);
        formData.append('isUpdateImage', false);
        // formData.append('articleImg', updateImg.imgFile);

        const response = await formSubmit(event, '/site-admin/update-article', 'PUT', formData)
        response.isSuccess ? alert('Article Edited') : alert(response.message);
    }

    useEffect(() => {
        getArticleInfo();
    }, []);

    return (
        <>
            <h1 className="heading"> Edit Article </h1>
            <div className="flex gap-8">
                <div className="w-3/4">
                    <ContentForm
                        articleData={articleData}
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        handleEditorChange={handleEditorChange}
                    />

                    <button onClick={handleSubmit} className="btn-primary w-fit mt-8">
                        <i className="fa-solid fa-pen-to-square mr-2"></i>
                        Edit
                    </button>
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img src={imgPreview} className="max-h-full max-w-full" />
                </div>
            </div>
        </>
    );
}
