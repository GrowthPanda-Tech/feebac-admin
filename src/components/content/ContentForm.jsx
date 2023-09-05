import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import makeRequest from "../../utils/makeRequest";

function Select({ label, name, onChange, items, selectedItem }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <select
                name={name}
                className="capitalize input-article border-none"
                onChange={onChange}
            >
                {items.map((item) => {
                    const value = selectedItem
                        ? selectedItem
                        : item.category_id;
                    const selected = selectedItem === item.category_id;

                    return (
                        <option
                            key={item.category_id}
                            value={value}
                            selected={selected}
                        >
                            {item.category_name}
                        </option>
                    );
                })}
            </select>
        </label>
    );
}

function Input({ label, name, value, onChange }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="input-article border-none"
            />
        </label>
    );
}

export default function ContentForm({
    articleData,
    handleChange,
    handleEditorChange,
}) {
    const tinyApi = import.meta.env.VITE_TINY_API_KEY;
    const [categories, setCategories] = useState([]);


    const getCategories = async () => {
        try {
            const response = await makeRequest("site-admin/get-all-category");
            if (response.isSuccess) {
                setCategories(response.categoryList);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-8">
                <div className="w-1/2">
                    <Input
                        label={"Title"}
                        name={"article_title"}
                        value={articleData ? articleData.article_title : ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-1/2">
                    <Select
                        label={"Category"}
                        name={"category"}
                        onChange={handleChange}
                        items={categories}
                        selectedItem={
                            articleData
                                ? articleData.category.category_id
                                : null
                        }
                    />
                </div>
            </div>
            <Input
                label={"Description"}
                name={"article_desctiption"}
                value={articleData ? articleData.article_desctiption : ""}
                onChange={handleChange}
            />

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Image (Optional) </span>
                <input
                    name="articleImg"
                    type="file"
                    accept="image/*"
                    className="input-article border-none"
                    onChange={handleChange}
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Content </span>
                <Editor
                    apiKey={tinyApi}
                    onEditorChange={handleEditorChange}
                    value={articleData.article_content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | image | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                    }}
                />
            </label>
        </div>
    );
}
