import { useState, useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import defaultImgPreview from "../../assets/defaultImgPreview.png";
import formSubmit from "../../utils/formSubmit";

export default function CategoryForm({ setIsShowForm }) {
    const { categories, setCategories } = useContext(CategoryContext);

    const [newCategory, setNewCategory] = useState({});
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);

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
        const formdata = new FormData();
        formdata.append("categoryName", newCategory.categoryName);
        formdata.append(
            "categoryImg",
            newCategory.categoryImg,
            newCategory.categoryImg.name
        );

        const response = await formSubmit(
            event,
            "site-admin/add-category",
            "POST",
            formdata
        );

        if (response.isSuccess) {
            const newCategories = categories.slice();
            newCategories.push(response.data);
            setCategories(newCategories);
            setIsShowForm(false);
            return;
        }

        alert(response.message);
    };

    return (
        <div className="bg-white rounded-xl mb-8 p-8 flex gap-8">
            <div className="w-1/5 flex justify-center items-center border rounded-xl">
                <img src={imgPreview} />
            </div>
            <div className="w-4/5">
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
                    <div className="flex gap-4">
                        <button className="btn-primary"> Save </button>
                        <button
                            className="btn-secondary"
                            onClick={() => setIsShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
