import { useContext } from "react";

import { Editor } from "@tinymce/tinymce-react";
import { CategoryContext } from "@/contexts/CategoryContext";

const TINY_API_KEY = import.meta.env.VITE_TINY_API_KEY;

function Select({ label, name, onChange, items, selectedItem, disabled }) {
  return (
    <label className="flex flex-col">
      <span className="mb-2 font-semibold"> {label} </span>
      <select
        name={name}
        value={selectedItem}
        className={`input-article border-none capitalize ${
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
      <span className="mb-2 font-semibold"> {label} </span>
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
  editorRef,
  isSaving,
}) {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
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
              articleData ? articleData.category : categories[0].category_id
            }
            disabled={isSaving}
          />
        </div>
      </div>
      <Input
        label={"Description"}
        name={"article_description"}
        value={articleData ? articleData.article_description : ""}
        onChange={handleChange}
        disabled={isSaving}
      />

      <label className="flex flex-col">
        <span className="mb-2 font-semibold"> Image (Optional) </span>
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
        <span className="mb-2 font-semibold"> Content </span>
        <Editor
          apiKey={TINY_API_KEY}
          initialValue={articleData.article_content || ""}
          onInit={(_, editor) => (editorRef.current = editor)}
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
        />
      </label>
    </div>
  );
}
