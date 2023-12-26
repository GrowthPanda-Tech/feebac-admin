import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Categories() {
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

  return (
    <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
      {categories.map((category, idx) => {
        const id = category.category_id;
        const name = category.category_name;
        const status = category.is_active;

        let icon_url = category.icon_url;

        if (!category.icon_url.includes("http")) {
          icon_url = BASE_URL + "/" + icon_url;
        }

        return (
          <div key={id} className="relative flex flex-col">
            <img
              src={icon_url}
              className={`aspect-square rounded-lg ${
                !status ? "disabled-card" : ""
              }`}
            />
            <span className="py-3 text-lg font-medium capitalize">{name}</span>
            <i
              className={`fa-solid ${
                status ? "fa-eye-slash" : "fa-eye"
              } absolute right-0 top-0 cursor-pointer p-4`}
              style={{
                color: "white",
              }}
              onClick={() => handleStatus(id, idx)}
            />
          </div>
        );
      })}
    </div>
  );
}
