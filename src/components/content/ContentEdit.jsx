import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import formSubmit from "../../utils/formSubmit";

export default function ContentEdit() {
    const { slug } = useParams();

    const [articleInfo, setArticleInfo] = useState({category:{category_id:null}});
    const [categories, setCategories] = useState([{category_id:null}]);
    const [updateImg, setUpdateImg] = useState({
        isUpdateImage: false,
        imgFile: null,
    });

    async function getArticleInfo() {
        const response = await makeRequest(`site-admin/show-article-info?articleId=${slug}`, GET);
        setArticleInfo(response.articleInfo);
    }

    // TODO: Put this in localstorage
    async function getAllCategories() {
        const response = await fetchFromServer('survey/get-all-category');
        if (!response.isSuccess) {
            return;
        }
        setCategories(response.categoryList);
    }

    useEffect(() => {
        getArticleInfo();
        getAllCategories();
    }, []);

    function handleInputChange(e) {
        setArticleInfo({...articleInfo, [e.target.name]: e.target.value})
        console.log(articleInfo);
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setUpdateImg({...updateImg, isUpdateImage: true, imgFile: file});

        // if (file) {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         setImgPreview(reader.result);
        //     }
        //     reader.readAsDataURL(file);
        // }
    }

    async function handleSubmit(e) {
        const formData = new FormData();
        formData.append('articleId', articleInfo.article_id);
        formData.append('articleTitle', articleInfo.article_title);
        formData.append('articleDesctiption', articleInfo.article_desctiption);
        formData.append('articleContent', articleInfo.article_content);
        formData.append('category', articleInfo.category);
        formData.append('isUpdateImage', updateImg.isUpdateImage);
        formData.append('articleImg', updateImg.imgFile);

        const response = await formSubmit(e, '/site-admin/update-article', formData, 'PUT')

        if (response.isSuccess) {
            alert('Article edited');
        } else {
            alert(response.message);
        }
    }

    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    // return (
    //     <form className="flex flex-col w-9/12 mx-auto mt-12 gap-4" onSubmit={handleSubmit}>
    //         <label>
    //             Title:
    //             <input value={articleInfo.article_title} name="article_title" onChange={(e) => handleInputChange(e)} />
    //         </label>
    //         {/* yeah i know there's a typo. blame the backend guy */}
    //         <label>
    //             Description: 
    //             <input value={articleInfo.article_desctiption} name="article_desctiption" onChange={(e) => handleInputChange(e)} />
    //         </label>
    //         <label>
    //             Content: 
    //             <textarea className="h-80 p-8" value={articleInfo.article_content} name="article_content" onChange={(e) => handleInputChange(e)} />
    //         </label>
    //         <label>
    //             Category: 
    //             <select onChange={(e) => handleInputChange(e)}>
    //                 {
    //                     categories.map((category) => 
    //                         <option key={category.category_id} selected={articleInfo.category.category_id == category.category_id} value={category.category_id}>
    //                             {category.category_name}
    //                         </option>
    //                     )
    //                 }
    //             </select>
    //         </label>
    //         <img src={baseUrl+articleInfo.image_url} className="w-80" />
    //         <button className="w-fit py-3 px-8 bg-[#EA525F] text-white font-bold">
    //             <i className="fa-regular fa-pen-to-square mr-4"></i>
    //             Submit
    //         </button>
    //     </form>
    // )

    return (
        <>
            <h1 className="text-xl font-bold my-9 ml-12"> Edit Article </h1>
            <div className="flex mx-12">
                <div className="flex flex-col w-3/5">
                    <form onSubmit={handleSubmit} className="flex flex-col w-3/5 gap-4">

                        <label className="flex flex-col">
                            Title
                            <input name='article_title' value={articleInfo.article_title} className="border-[#EA8552]" onChange={(e) => handleInputChange(e)} />
                        </label>
                        <label className="flex flex-col">
                            Description
                            <input name='article_desctiption' value={articleInfo.article_desctiption} className="border-[#EA8552]" onChange={(e) => handleInputChange(e)} />
                        </label>
                        <label className="flex flex-col">
                            Image (Optional)
                            <input name='articleImg' type="file" accept="image/*" className="border-[#EA8552]" onChange={(e) => handleImageChange(e)} />
                        </label>
                        <label className="flex flex-col">
                            Category
                            <select name="category" className="capitalize" onChange={(e) => handleInputChange(e)}>
                                {
                                    categories.map((category) => (
                                        <option
                                            key={category.category_id}
                                            selected={articleInfo.category.category_id == category.category_id}
                                            value={category.category_id}>
                                            {category.category_name}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className="flex flex-col">
                            Content
                            <textarea
                                name='article_content'
                                value={articleInfo.article_content}
                                className="h-60 border border-[#EA8552] rounded-xl p-3"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </label>
                        <button className="w-fit py-3 px-8 bg-[#EA8552] text-white font-bold">
                            <i className="fa-solid fa-floppy-disk mr-2"></i>
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-2/5">
                    Image Preview
                    <img src={ updateImg.isUpdateImage ? updateImg.imgFile : baseUrl+articleInfo.image_url } />
                    {/* {imgPreview && <img src={imgPreview} />} */}
                </div>
            </div>
            
        </>
    )
}
