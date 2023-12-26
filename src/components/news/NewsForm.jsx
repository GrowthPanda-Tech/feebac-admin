import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

import CategorySelector from "./utilComponents/CategorySelector";

export default function NewsForm({ newsData, handleChange, isSaving }) {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex gap-6">
        <div className="md:w-1/2">
          <label className="flex flex-col">
            <span className="mb-2 font-semibold">Title</span>
            <input
              name="title"
              className={`rounded-xl px-8 py-3  ${
                isSaving ? "bg-light-grey" : ""
              }`}
              value={newsData ? newsData.title : ""}
              onChange={handleChange}
              required
              disabled={isSaving}
            />
          </label>
        </div>
        <div className="md:w-1/2">
          <CategorySelector
            value={newsData ? newsData.category : categories[0].category_id}
            handleChange={handleChange}
            disabled={isSaving}
          />
        </div>
      </div>
      <label className="flex flex-col">
        <span className="mb-2 font-semibold">Source Link</span>
        <input
          name="source_url"
          type="url"
          placeholder="https://example.com"
          pattern="https://.*"
          className={`rounded-xl px-8 py-3  ${isSaving ? "bg-light-grey" : ""}`}
          value={newsData ? newsData.source_url : ""}
          onChange={handleChange}
          disabled={isSaving}
          required
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 font-semibold">Image</span>
        <input
          name="news_image"
          type="file"
          accept="image/*"
          className={`rounded-xl px-8 py-3  ${
            isSaving ? "bg-light-grey" : "bg-white"
          }`}
          onChange={handleChange}
          disabled={isSaving}
          required
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 font-semibold">Caption</span>
        <input
          name="caption"
          className={`rounded-xl px-8 py-3  ${isSaving ? "bg-light-grey" : ""}`}
          value={newsData ? newsData.caption : ""}
          onChange={handleChange}
          required
          disabled={isSaving}
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 font-semibold">Description</span>
        <textarea
          className={`rounded-xl p-8  ${isSaving ? "bg-light-grey" : ""}`}
          label={"Description"}
          name={"description"}
          rows={10}
          disabled={isSaving}
          value={newsData ? newsData.description : ""}
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
}
