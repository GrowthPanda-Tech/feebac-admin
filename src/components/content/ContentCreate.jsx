import { useState } from "react"
import ContentForm from "./ContentForm";
import defaultImgPreview from "../../assets/defaultImgPreview.png";
import formSubmit from "../../utils/formSubmit";

export default function ContentCreate() {
    const [articleData, setArticleData] = useState({ category: '1', articleImg: null, });
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);

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

    const handleEditorChange = (content, editor) => setArticleData({ ...articleData, articleContent: content });

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('articleTitle', articleData.articleTitle);
        formData.append('articleDesctiption', articleData.articleDescription);
        formData.append('articleContent', articleData.articleContent);
        formData.append('category', articleData.category);
        formData.append('articleImg', articleData.articleImg, articleData.articleImg.name);

        const response = await formSubmit(e, 'site-admin/create-article', 'POST', formData);
        response.isSuccess ? alert('Article saved to draft') : alert(response.message);
    }

    return (
        <>
            <h1 className="heading"> Create New Article </h1>
            <div className="flex gap-8">
                <div className="w-3/4">
                    <ContentForm
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        handleEditorChange={handleEditorChange}
                        handleSubmit={handleSubmit}
                    />
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img src={imgPreview} className="max-h-full max-w-full" />
                </div>
            </div>
        </>
    );
}
