import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

export default function Categories() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { categories } = useContext(CategoryContext);
    return (
        <div className="grid grid-cols-5 gap-12">
            {categories.map((category) => (
                <div
                    key={category.category_id}
                    className="flex flex-col relative"
                >
                    <img
                        src={baseUrl + category.icon_url}
                        className="rounded-lg"
                    />
                    <span className="capitalize text-lg font-medium py-3">
                        {category.category_name}
                    </span>
                </div>
            ))}
        </div>
    );
}
