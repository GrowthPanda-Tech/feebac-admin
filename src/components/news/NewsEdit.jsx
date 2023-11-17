import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";

import swal from "../../utils/swal";
import formSubmit from "../../utils/formSubmit";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

//components
import NewsForm from "./NewsForm";
import PageTitle from "../PageTitle";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function NewsEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const { from } = location.state;

    const { categories } = useContext(CategoryContext);

    const [newsData, setNewsData] = useState({});
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [imgUpdate, setImgUpdate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const editHandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "newsImage") {
            const file = event.target.files[0];
            setNewsData({ ...newsData, newsImage: file });
            setImgUpdate(true);

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImgPreview(reader.result);
                reader.readAsDataURL(file);
            }

            return;
        }

        setNewsData({ ...newsData, [name]: value });
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            let catId;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                if (category.category_name === from.category) {
                    catId = category.category_id;
                }
            }
            setNewsData({ ...from, category: catId });
        }

        return () => {
            ignore = true;
        };
    }, []);

    const handleSubmit = async (event) => {
        const formdata = new FormData();

        for (const [key, value] of Object.entries(newsData)) {
            if (key === "newsImage") {
                if (imgUpdate) {
                    formdata.append(
                        "newsImage",
                        newsData.newsImage,
                        newsData.newsImage.name
                    );
                }
                continue;
            }
            formdata.append(key, value);
        }

        try {
            setIsSaving(true);

            const response = await formSubmit(
                event,
                "news/edit-news",
                "PUT",
                formdata
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            swal("success", response.message);
            navigate("/news");
        } catch (error) {
            swal("error", error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Edit News"} />
            <div className="flex gap-8">
                <div className="w-3/4">
                    <NewsForm
                        newsData={newsData}
                        handleChange={editHandleChange}
                        isSaving={isSaving}
                    />

                    <button
                        className={` ${
                            isSaving ? "btn-secondary" : "btn-primary"
                        }  w-fit mt-8 `}
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        {isSaving ? "Saving" : "Save Changes"}
                    </button>
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img
                        src={
                            newsData ? BASE_URL + newsData.imageUrl : imgPreview
                        }
                        className="max-h-full max-w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default NewsEdit;
