import { useContext } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

//components
import ThreeDotMenu from "@utilComps/ThreeDotMenu";

export default function Categories({
  setIsShowCategoryCreate,
  setShowDelete,
  setEditIndex,
  setDeleteIndex,
}) {
  const { categories } = useContext(CategoryContext);

  const handleEdit = (idx) => {
    setIsShowCategoryCreate(true);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    setShowDelete(true);
    setDeleteIndex(idx);
  };

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
      {categories.map(({ category_id, category_name, icon_url }, idx) => (
        <div key={category_id} className="flex flex-col">
          {category_name !== "general" && (
            <ThreeDotMenu
              handleEdit={() => handleEdit(idx)}
              handleDelete={() => handleDelete(idx)}
            />
          )}
          <img src={icon_url} className="aspect-square rounded-lg" />
          <span className="py-3 text-lg font-medium capitalize">
            {category_name}
          </span>
        </div>
      ))}
    </div>
  );
}
