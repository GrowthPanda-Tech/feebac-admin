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
                        <span className="font-semibold mb-2">Title</span>
                        <input
                            name="title"
                            className={`py-3 px-8 rounded-xl  ${
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
                        value={
                            newsData
                                ? newsData.category
                                : categories[0].category_id
                        }
                        handleChange={handleChange}
                        disabled={isSaving}
                    />
                </div>
            </div>
            <label className="flex flex-col">
                <span className="font-semibold mb-2">Source Link</span>
                <input
                    name="source_url"
                    type="url"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    className={`py-3 px-8 rounded-xl  ${
                        isSaving ? "bg-light-grey" : ""
                    }`}
                    value={newsData ? newsData.source_url : ""}
                    onChange={handleChange}
                    disabled={isSaving}
                    required
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2">Image</span>
                <input
                    name="news_image"
                    type="file"
                    accept="image/*"
                    className={`py-3 px-8 rounded-xl  ${
                        isSaving ? "bg-light-grey" : "bg-white"
                    }`}
                    onChange={handleChange}
                    disabled={isSaving}
                    required
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2">Caption</span>
                <input
                    name="caption"
                    className={`py-3 px-8 rounded-xl  ${
                        isSaving ? "bg-light-grey" : ""
                    }`}
                    value={newsData ? newsData.caption : ""}
                    onChange={handleChange}
                    required
                    disabled={isSaving}
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2">Description</span>
                <textarea
                    className={`p-8 rounded-xl  ${
                        isSaving ? "bg-light-grey" : ""
                    }`}
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
