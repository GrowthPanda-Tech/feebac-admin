import { useState, useContext } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

//assets
import delete_icon from "@/assets/delete_icon.png";

export default function CategoryDelete({ index, setShowDelete }) {
  const { categories, setCategories } = useContext(CategoryContext);

  const { category_name, category_id, content_count } = categories[index];
  const { survey, article, news } = content_count;

  //states
  const [loading, setLoading] = useState(false);

  //event handlers
  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await makeRequest(
        `site-admin/delete-category?id=${category_id}`,
        "DELETE",
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      //manage context state
      setCategories((prev) =>
        prev.filter((category) => category !== categories[index]),
      );

      //hide delete menu
      setShowDelete(false);

      swal("success", response.message);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[25vw] flex-col items-center justify-between gap-6 rounded-xl bg-white p-8">
      <div className="flex flex-col items-center gap-4">
        <img src={delete_icon} alt="delete_icon" className="w-fit" />
        <div className="flex flex-col items-center text-xl font-medium">
          <span>Are you sure you want to delete</span>
          <span className="capitalize">{category_name} ?</span>
        </div>

        {/* TODO: should I make a component for this? */}
        <span className="font-light opacity-50">
          <span className="capitalize">{category_name}</span> has{" "}
          <span className="font-medium">{survey} Surveys</span>,{" "}
          <span className="font-medium">{article} Long Form Articles</span> and{" "}
          <span className="font-medium">{news} Case Studies</span> attached with
          it. They will be moved into the General category.
        </span>
      </div>

      <div className="flex gap-7">
        <button
          className="btn-secondary"
          onClick={() => setShowDelete(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn-primary disabled:btn-secondary"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
