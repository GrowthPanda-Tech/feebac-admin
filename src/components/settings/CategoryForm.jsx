import { useState, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

import makeRequest from "../../utils/makeRequest";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

import AlertComponent from "../AlertComponent/AlertComponent";

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

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImgPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImgPreview(noImg);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append("categoryName", newCategory.categoryName);
        formdata.append(
            "categoryImg",
            newCategory.categoryImg,
            newCategory.categoryImg.name
        );

        try {
            const response = await makeRequest(
                "site-admin/add-category",
                "POST",
                formdata
            );

            if (!response.isSuccess) {
                AlertComponent("failed", response);
                return;
            }

            AlertComponent("success", response);

            const newCategories = categories.slice();
            newCategories.push(response.data);
            setCategories(newCategories);

            setIsShowCategoryCreate(false);
        } catch (error) {
            AlertComponent("error", error);
        }
    };

    return (
        <div className="bg-white rounded-xl mb-8 p-8 flex flex-col md:flex-row gap-8">
            <div className=" w-full md:w-1/5 flex justify-center items-center border rounded-xl">
                <img src={imgPreview} />
            </div>
            <div className="w-full md:w-4/5">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col h-full justify-evenly gap-4"
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
                    <div className="flex flex-col md:flex-row gap-4">
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
