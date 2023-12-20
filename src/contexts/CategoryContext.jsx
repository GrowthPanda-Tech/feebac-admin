import { createContext, useState, useEffect } from "react";
import makeRequest from "../utils/makeRequest";

export const CategoryContext = createContext(null);

export default function CategoryContextProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function getCategories() {
      try {
        const response = await makeRequest("site-admin/get-all-category");

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setCategories(response.categoryList);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getCategories();

    return () => {
      ignore = false;
    };
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}
