import { useContext } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

//components
import CategoryCard from "@utilComps/CategoryCard";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Categories({ setIsShowCategoryCreate, setEditIndex }) {
  const { categories, setCategories } = useContext(CategoryContext);

  const handleStatus = async (id, idx) => {
    try {
      const response = await makeRequest(
        "site-admin/toggle-category-status",
        "PATCH",
        { categoryId: parseInt(id) }
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      const spread = [...categories];
      spread[idx].is_active = !spread[idx].is_active;
      setCategories(spread);

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
      {categories.map((category, idx) => {
        const id = category.category_id;
        const name = category.category_name;
        const status = category.is_active;

        let icon_url = category.icon_url;

        if (!category.icon_url.includes("http")) {
          icon_url = BASE_URL + "/" + icon_url;
        }

        return (
          <div key={id} className="flex flex-col">
            <CategoryCard
              handleStatus={() => handleStatus(category.category_id, idx)}
              handleEdit={() => handleEdit(idx)}
            />
            <img
              src={icon_url}
              className={`aspect-square rounded-lg ${
                !status ? "disabled-card" : ""
              }`}
            />
            <span className="py-3 text-lg font-medium capitalize">{name}</span>
          </div>
        );
      })}
    </div>
  );
}
