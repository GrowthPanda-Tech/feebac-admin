import { useContext } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

//components
import ThreeDotMenu from "@utilComps/ThreeDotMenu";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Categories({ setIsShowCategoryCreate, setEditIndex }) {
  const { categories, setCategories } = useContext(CategoryContext);

  const handleStatus = async (category_id, idx) => {
    try {
      const response = await makeRequest(
        "site-admin/toggle-category-status",
        "PATCH",
        { categoryId: parseInt(category_id) },
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      setCategories((prev) => {
        return prev.map((category, i) => {
          if (i === idx) {
            return { ...category, is_active: !category.is_active };
          }
          return category;
        });
      });

      swal("success", response.message);
    } catch (error) {
      swal("error", error.message);
    }
  };

  const handleEdit = (idx) => {
    setIsShowCategoryCreate(true);
    setEditIndex(idx);
  };

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
      {categories.map(
        ({ category_id, category_name, is_active, icon_url }, idx) => {
          const imageUrl = icon_url.includes("http")
            ? icon_url
            : `${BASE_URL}/${icon_url}`;

          return (
            <div key={category_id} className="flex flex-col">
              <ThreeDotMenu
                handleStatus={() => handleStatus(category_id, idx)}
                handleEdit={() => handleEdit(idx)}
              />
              <img
                src={imageUrl}
                className={`aspect-square rounded-lg ${
                  !is_active ? "disabled-card" : ""
                }`}
              />
              <span className="py-3 text-lg font-medium capitalize">
                {category_name}
              </span>
            </div>
          );
        },
      )}
    </div>
  );
}
