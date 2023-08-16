import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

function Select({ label, name, onChange, items }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <select name={name} className="capitalize input-article" onChange={onChange}>
                {
                    items.map((item) => (
                        <option key={item.category_id} value={item.category_id}>
                            {item.category_name}
                        </option>
                    ))
                }
            </select>
        </label>
    );
}

function Input({ label, name,  onChange }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <input name={name} onChange={onChange} className="input-article" />
        </label>
    );
}

export default function ContentForm({ handleImageChange }) {
    const [articleData, setArticleData] = useState({ category: '1', articleImg: null, });
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const response = await makeRequest('survey/get-all-category', 'GET');
        setCategories(response.categoryList);
    }

    const handleInputChange = (e) => setArticleData({...articleData, [e.target.name]: e.target.value});

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

    useEffect(() => {
        getCategories();
    },[])

    console.log(categories);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-8">
                <div className="w-1/2">
                    <Input label={'Title'} name={'articleTitle'} onChange={handleInputChange} />
                </div>
                <div className="w-1/2">
                    <Select label={'Category'} name={'category'} onChange={handleInputChange} items={categories} />
                </div>
            </div>
            <Input label={'Description'} name={'articleTitle'} onChange={handleInputChange} />

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Image (Optional) </span>
                <input name='articleImg' type="file" accept="image/*" className="input-article" onChange={handleImageChange} />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Content </span>
                <textarea name='articleContent' className="h-64 py-8 input-article" onChange={(e) => handleInputChange(e)} />
            </label>

            <button className="btn-primary w-fit" onChange={handleSubmit}>
                <i className="fa-solid fa-floppy-disk mr-2"></i>
                Save Draft
            </button>
        </div>
    );
}
