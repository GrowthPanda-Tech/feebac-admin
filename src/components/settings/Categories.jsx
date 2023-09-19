import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

export default function Categories() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
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
