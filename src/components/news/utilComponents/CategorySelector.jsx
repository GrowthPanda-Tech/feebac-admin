import { useContext } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

export default function CategorySelector({ value, handleChange, disabled }) {
  const { categories } = useContext(CategoryContext);

  return (
    <label className="flex flex-col">
      <span className="mb-2 font-semibold"> Category </span>
      <select
        name="category"
        value={value}
        className="appearance-none rounded-xl border-2 border-[#EA8552] bg-white px-8 py-3 capitalize"
        onChange={handleChange}
        disabled={disabled}
        required
      >
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </label>
  );
}
