import { createContext, useState, useEffect } from "react";
import makeRequest from "../utils/makeRequest";

export const CategoryContext = createContext(null);

export default function CategoryContextProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        const response = await makeRequest(
            "site-admin/get-all-category",
            "GET"
        );
        response.isSuccess && setCategories(response.categoryList);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}
