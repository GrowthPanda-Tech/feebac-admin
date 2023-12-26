import { useState, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

import defaultImgPreview from "../../assets/defaultImgPreview.png";
import swal from "../../utils/swal";
import makeRequest from "../../utils/makeRequest";

export default function CategoryForm({ setIsShowCategoryCreate }) {
  const [newCategory, setNewCategory] = useState({});
  const [imgPreview, setImgPreview] = useState(defaultImgPreview);

  const { categories, setCategories } = useContext(CategoryContext);

  const onChange = (event) => {
    if (event.target.name === "categoryName") {
      setNewCategory({
        ...newCategory,
        categoryName: event.target.value,
      });
      return;
    }

    //TODO: can i export this to utils?
    const file = event.target.files[0];
    setNewCategory({ ...newCategory, categoryImg: file });

    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("categoryName", newCategory.categoryName);
    formdata.append("categoryImg", newCategory.categoryImg);

    try {
      const response = await makeRequest(
        "site-admin/add-category",
        "POST",
        formdata
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);

      const newCategories = categories.slice();
      newCategories.push(response.data);
      setCategories(newCategories);

      setIsShowCategoryCreate(false);
    } catch (error) {
      swal("error", error.message);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-8 rounded-xl bg-white p-8 md:flex-row">
      <div className=" flex w-full items-center justify-center rounded-xl border md:w-1/5">
        <img src={imgPreview} />
      </div>
      <div className="w-full md:w-4/5">
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col justify-evenly gap-4"
        >
          <label className="flex flex-col font-semibold">
            Enter Category Name *
            <input
              type="text"
              name="categoryName"
              className="input-primary"
              onChange={onChange}
              required
            />
          </label>
          <label className="flex flex-col font-semibold">
            Upload Image *
            <input
              type="file"
              className="input-primary"
              accept="image/*"
              name="categoryImg"
              onChange={onChange}
              required
            />
          </label>
          <div className="flex flex-col gap-4 md:flex-row">
            <button className="btn-primary"> Save </button>
            <button
              className="btn-secondary"
              onClick={() => setIsShowCategoryCreate(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
