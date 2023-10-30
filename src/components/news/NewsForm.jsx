import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

function Select({ label, name, value, onChange, items, disabled }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <select
                name={name}
                value={value}
                className={`capitalize py-3 px-8 rounded-xl  ${
                    disabled ? "bg-light-grey" : ""
                }`}
                onChange={onChange}
                disabled={disabled}
                required
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
                    <Select
                        label={"Category"}
                        name={"category"}
                        value={
                            newsData
                                ? newsData.category
                                : categories[0].category_id
                        }
                        onChange={handleChange}
                        items={categories}
                        disabled={isSaving}
                    />
                </div>
            </div>
            <label className="flex flex-col">
                <span className="font-semibold mb-2">Article Link</span>
                <input
                    name="newsUrl"
                    type="url"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    className={`py-3 px-8 rounded-xl  ${
                        isSaving ? "bg-light-grey" : ""
                    }`}
                    value={newsData ? newsData.newsUrl : ""}
                    onChange={handleChange}
                    disabled={isSaving}
                    required
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Image </span>
                <input
                    name="newsImage"
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
                <span className="font-semibold mb-2">Description</span>
                <textarea
                    className={`py-3 px-8 rounded-xl  ${
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
