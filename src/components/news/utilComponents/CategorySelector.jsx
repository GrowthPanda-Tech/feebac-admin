import { useContext } from "react";
import { CategoryContext } from "../../../contexts/CategoryContext";

export default function CategorySelector({ value, handleChange, disabled }) {
  const { categories } = useContext(CategoryContext);
  console.log(value);

  return (
    <label className="flex flex-col">
      <span className="font-semibold mb-2"> Category </span>
      <select
        name="category"
        value={value}
        className={`capitalize py-3 px-8 rounded-xl appearance-none ${
          disabled ? "bg-light-grey" : "bg-white"
        }`}
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
