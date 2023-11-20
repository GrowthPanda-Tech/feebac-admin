import { Editor } from "@tinymce/tinymce-react";
import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

const TINY_API_KEY = import.meta.env.VITE_TINY_API_KEY;

function Select({ label, name, onChange, items, selectedItem, disabled }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <select
                name={name}
                value={selectedItem}
                className={`capitalize input-article border-none ${
                    disabled ? "bg-light-grey" : ""
                } `}
                onChange={onChange}
                required
                disabled={disabled}
            >
                {items.map((item) => {
                    return (
                        <option key={item.category_id} value={item.category_id}>
                            {item.category_name}
                        </option>
                    );
                })}
            </select>
        </label>
    );
}

function Input({ label, name, value, onChange, disabled }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className={`input-article  border-none ${
                    disabled ? "bg-light-grey" : ""
                } `}
                required
                disabled={disabled}
            />
        </label>
    );
}

export default function ContentForm({
    articleData,
    handleChange,
    handleEditorChange,
    isSaving,
}) {
    const { categories } = useContext(CategoryContext);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="md:w-1/2">
                    <Input
                        label={"Title"}
                        name={"article_title"}
                        value={articleData ? articleData.article_title : ""}
                        onChange={handleChange}
                        disabled={isSaving}
                    />
                </div>
                <div className="md:w-1/2">
                    <Select
                        label={"Category"}
                        name={"category"}
                        onChange={handleChange}
                        items={categories}
                        selectedItem={
                            articleData
                                ? articleData.category
                                : categories[0].category_id
                        }
                        disabled={isSaving}
                    />
                </div>
            </div>
            <Input
                label={"Description"}
                name={"article_desctiption"}
                value={articleData ? articleData.article_desctiption : ""}
                onChange={handleChange}
                disabled={isSaving}
            />

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Image (Optional) </span>
                <input
                    name="articleImg"
                    type="file"
                    accept="image/*"
                    className={`input-article border-none ${
                        isSaving ? "bg-light-grey" : ""
                    }`}
                    onChange={handleChange}
                    disabled={isSaving}
                />
            </label>

            <Input
                label={"Caption"}
                name={"caption"}
                value={articleData ? articleData.caption : ""}
                onChange={handleChange}
                disabled={isSaving}
            />

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Content </span>
                <Editor
                    apiKey={TINY_API_KEY}
                    onEditorChange={handleEditorChange}
                    value={
                        articleData.article_content
                            ? articleData.article_content
                            : ""
                    }
                    init={{
                        selector: "textarea", // change this value according to your HTML
                        content_css: "tinymce-5",
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
