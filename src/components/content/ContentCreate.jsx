import { useState, useEffect } from "react"
import makeRequest from "../../utils/makeRequest";
import formSubmit from "../../utils/formSubmit";

export default function ContentCreate() {
    const [articleData, setArticleData] = useState({
        articleTitle: '',
        articleDescription: '',
        articleContent: '',
        category: '1',
        articleImg: null,
    });

    const [categories, setCategories] = useState([]);
    const [imgPreview, setImgPreview] = useState(null);

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

    const getAllCategories = async () => {
        const response = await makeRequest('survey/get-all-category', 'GET');
        if (!response.isSuccess) {
            return;
        }
        setCategories(response.categoryList);
    }

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('articleTitle', articleData.articleTitle);
        formData.append('articleDesctiption', articleData.articleDescription);
        formData.append('articleContent', articleData.articleContent);
        formData.append('category', articleData.category);
        formData.append('articleImg', articleData.articleImg, articleData.articleImg.name);

        const response = await formSubmit(e, 'site-admin/create-article', 'PUT', formData)

        if (response.isSuccess) {
            alert('Article saved to draft');
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);


    return (
        <div className="p-9">
            <h1 className="heading"> Create New Article </h1>
            <div className="flex mx-12">
                <form onSubmit={handleSubmit} className="flex flex-col w-3/5 gap-4">
                    <label className="flex flex-col">
                        Title
                        <input name='articleTitle' className="border-[#EA8552]" onChange={(e) => handleInputChange(e)} />
                    </label>
                    <label className="flex flex-col">
                        Description
                        <input name='articleDescription' className="border-[#EA8552]" onChange={(e) => handleInputChange(e)} />
                    </label>
                    <label className="flex flex-col">
                        Image (Optional)
                        <input name='articleImg' type="file" accept="image/*" className="border-[#EA8552]" onChange={handleImageChange} />
                    </label>
                    <label className="flex flex-col">
                        Category
                        <select name="category" className="capitalize" onChange={handleInputChange}>
                            {
                                categories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                    <label className="flex flex-col">
                        Content
                        <textarea name='articleContent' className="h-60 border border-[#EA8552] rounded-xl p-3" onChange={(e) => handleInputChange(e)} />
                    </label>
                    <button className="w-fit py-3 px-8 bg-[#EA8552] text-white font-bold">
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        Save Draft
                    </button>
                </form>
                <div className="w-2/5">
                    Image Preview
                    {imgPreview && <img src={imgPreview} />}
                </div>
            </div>
        </div>
    );
}
