import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

export default function Categories() {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
      {categories.map((category) => (
        <div key={category.category_id} className="flex flex-col relative">
          <img src={category.icon_url} className="rounded-lg aspect-square" />
          <span className="capitalize text-lg font-medium py-3">
            {category.category_name}
          </span>
        </div>
      ))}
    </div>
  );
}
