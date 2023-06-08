import { useState, useEffect } from "react"
import makeRequest from "../../utils/makeRequest";
import formSubmit from "../../utils/formSubmit";

function FormField({inputType, title, name, onChange}) {
    if (inputType === 'input') {
        return (
            <label className="flex flex-col">
                {title}
                <input name={name} className="border-[#EA8552]" onChange={(e) => onChange(e)} />
            </label>
        )
    }

    if (inputType === 'textarea') {
        return (
            <label className="flex flex-col">
                {title}
                <textarea name={name} className="h-60 border border-[#EA8552] rounded-xl p-3" onChange={(e) => onChange(e)} />
            </label>
        )
    } 
}

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

    function handleInputChange(e) {
        setArticleData({...articleData, [e.target.name]: e.target.value});
    }

    function handleImageChange(e) {
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

    // TODO: Put this in localstorage
    async function getAllCategories() {
        const response = await makeRequest('survey/get-all-category', 'GET');
        if (!response.isSuccess) {
            return;
        }
        setCategories(response.categoryList);
    }
    useEffect(() => {
        getAllCategories();
    }, []);

    async function handleSubmit(e) {
        const formData = new FormData();
        formData.append('articleTitle', articleData.articleTitle);
        formData.append('articleDesctiption', articleData.articleDescription);
        formData.append('articleContent', articleData.articleContent);
        formData.append('category', articleData.category);
        formData.append('articleImg', articleData.articleImg, articleData.articleImg.name);

        const response = await formSubmit(e, 'site-admin/create-article', formData)

        if (response.isSuccess) {
            alert('Article saved to draft');
        } else {
            alert(response.message);
        }
    }

    return (
        <>
            <h1 className="text-xl font-bold my-9 ml-12"> Create New Article </h1>
            <div className="flex mx-12">
                <div className="flex flex-col w-3/5">
                    <form onSubmit={handleSubmit} className="flex flex-col w-3/5 gap-4">

                        <FormField inputType={'input'} title={'Title'} name={'articleTitle'} onChange={handleInputChange} />
                        <FormField inputType={'input'} title={'Description'} name={'articleDescription'} onChange={handleInputChange} />
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
                        <FormField inputType={'textarea'} title={'Content'} name={'articleContent'} onChange={handleInputChange} />
                        <button className="w-fit py-3 px-8 bg-[#EA8552] text-white font-bold">
                            <i className="fa-solid fa-floppy-disk mr-2"></i>
                            Save Draft
                        </button>
                    </form>
                </div>
                <div className="w-2/5">
                    Image Preview
                    {imgPreview && <img src={imgPreview} />}
                </div>
            </div>
            
        </>
    )
}
