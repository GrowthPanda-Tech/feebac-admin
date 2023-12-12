import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Categories() {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
      {categories.map((category) => {
        let icon_url = category.icon_url;

        if (!category.icon_url.includes("http")) {
          icon_url = BASE_URL + "/" + icon_url;
        }

        return (
          <div key={category.category_id} className="flex flex-col relative">
            <img src={icon_url} className="rounded-lg aspect-square" />
            <span className="capitalize text-lg font-medium py-3">
              {category.category_name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
