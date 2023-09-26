import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Categories() {
    const { categories } = useContext(CategoryContext);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {categories.map((category) => (
                <div
                    key={category.category_id}
                    className="flex flex-col relative"
                >
                    <img
                        src={BASE_URL + category.icon_url}
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
