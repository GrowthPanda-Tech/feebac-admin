import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

function Select({ label, name, value, onChange, items }) {
    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-2"> {label} </span>
            <select
                name={name}
                value={value}
                className="capitalize py-3 px-8 rounded-xl bg-white"
                onChange={onChange}
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

export default function NewsForm({ newsData, handleChange }) {
    const { categories } = useContext(CategoryContext);

    return (
        <div className="flex flex-col justify-between gap-8">
            <div className="flex gap-6">
                <div className="md:w-1/2">
                    <label className="flex flex-col">
                        <span className="font-semibold mb-2">Title</span>
                        <input
                            name="title"
                            className="py-3 px-8 rounded-xl bg-white"
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="md:w-1/2">
                    <Select
                        label={"Category"}
                        name={"category"}
                        // value={
                        //     newsData.category.category_id
                        //         ? newsData.category.category_id
                        //         : ""
                        // }
                        onChange={handleChange}
                        items={categories}
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
                    className="py-3 px-8 rounded-xl bg-white"
                    onChange={handleChange}
                    required
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold mb-2"> Image (Optional) </span>
                <input
                    name="newsImage"
                    type="file"
                    accept="image/*"
                    className="py-3 px-8 rounded-xl bg-white"
                    onChange={handleChange}
                    required
                />
            </label>
            <label className="flex flex-col">
                <span className="font-semibold mb-2">
                    Description (in 60 words)
                </span>
                <textarea
                    className="py-3 px-8 rounded-xl bg-white"
                    label={"Description"}
                    name={"description"}
                    rows={10}
                    // value={newsData ? newsData.news_desctiption : null}
                    onChange={handleChange}
                    required
                />
            </label>
        </div>
    );
}
