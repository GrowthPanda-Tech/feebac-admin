import { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import makeRequest from "../../utils/makeRequest";

function Select({ label, name, onChange, items }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <select name={name} className="capitalize input-article border-none" onChange={onChange}>
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
            <input name={name} onChange={onChange} className="input-article border-none" />
        </label>
    );
}

export default function ContentForm({ handleInputChange, handleImageChange, handleEditorChange, handleSubmit }) {
    const [categories, setCategories] = useState([]);
    const tinyApi = import.meta.env.TINY_API;

    const getCategories = async () => {
        const response = await makeRequest('survey/get-all-category', 'GET');
        setCategories(response.categoryList);
    }

    useEffect(() => {
        getCategories();
    },[])

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
            <Input label={'Description'} name={'articleDescription'} onChange={handleInputChange} />

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Image (Optional) </span>
                <input name='articleImg' type="file" accept="image/*" className="input-article border-none" onChange={handleImageChange} />
            </label>

            {/* <label className="flex flex-col"> */}
            {/*     <span className="font-semibold mb-2"> Content </span> */}
            {/*     <textarea name='articleContent' className="h-64 py-8 input-article" onChange={(e) => handleInputChange(e)} /> */}
            {/* </label> */}

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Content </span>
                <Editor
                    apiKey={tinyApi}
                    onEditorChange={handleEditorChange}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | image | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </label>

            <button className="btn-primary w-fit" onClick={handleSubmit}>
                <i className="fa-solid fa-floppy-disk mr-2"></i>
                Save Draft
            </button>
        </div>
    );
}
