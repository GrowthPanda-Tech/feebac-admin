import { useState, useContext, useMemo } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

//utils
import swal from "@/utils/swal";
import makeRequest from "@/utils/makeRequest";
import fileReader from "@/utils/fileReader";

//assets
import defaultImgPreview from "@/assets/defaultImgPreview.png";

export default function CategoryForm({
  setIsShowCategoryCreate,
  editIndex,
  setEditIndex,
}) {
  const { categories, setCategories } = useContext(CategoryContext);

  const INIT_STATE = useMemo(() => {
    const { category_id, category_name, icon_url } =
      categories[editIndex] || {};

    return {
      category_id: category_id || null,
      category_name: category_name || "",
      icon_url: icon_url || null,
    };
  }, [categories, editIndex]);

  const INIT_PREVIEW = useMemo(() => {
    return INIT_STATE.icon_url ? INIT_STATE.icon_url : defaultImgPreview;
  }, [INIT_STATE.icon_url]);

  const [category, setCategory] = useState(INIT_STATE);
  const [imgPreview, setImgPreview] = useState(INIT_PREVIEW);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImgChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setCategory((prev) => ({ ...prev, icon_url: file }));

      try {
        const preview = await fileReader(file);
        setImgPreview(preview);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setIsShowCategoryCreate(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const route = editIndex
      ? "site-admin/update-category"
      : "site-admin/add-category";
    const method = editIndex ? "PUT" : "POST";

    const formdata = new FormData();
    for (const [key, value] of Object.entries(category)) {
      if (value === INIT_STATE[key] && key !== "category_id") {
        continue;
      }
      formdata.append(key, value);
    }

    setLoading(true);

    try {
      const response = await makeRequest(route, method, formdata);

      if (!response.isSuccess) throw new Error(response.message);

      swal("success", response.message);

      if (editIndex) {
        setCategories((prev) =>
          prev.map((category, index) =>
            index === editIndex ? response.data : category
          )
        );
      } else {
        setCategories((prev) => [...prev, response.data]);
      }

      setEditIndex(null);
      setIsShowCategoryCreate(false);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 flex w-[60rem] flex-col items-center gap-11 rounded-xl bg-white p-8 md:flex-row">
      <div className="flex aspect-square w-1/5 items-center justify-center rounded-xl border">
        <img src={imgPreview} />
      </div>
      <div className="w-4/5">
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col justify-evenly gap-6"
        >
          <label className="flex flex-col font-semibold">
            Enter Category Name *
            <input
              type="text"
              name="category_name"
              className="input-primary"
              value={category.category_name}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Upload Image *
            <input
              type="file"
              className="input-primary"
              accept="image/*"
              name="icon_url"
              onChange={handleImgChange}
            />
          </label>
          <div className="flex flex-col gap-4 md:flex-row">
            <button
              className="btn-primary disabled:btn-secondary disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              className="btn-secondary disabled:cursor-not-allowed"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
