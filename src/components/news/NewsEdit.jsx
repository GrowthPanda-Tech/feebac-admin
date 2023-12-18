import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

//components
import NewsForm from "./NewsForm";
import PageTitle from "../__helperComponents__/PageTitle";

export default function NewsEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state;
  const { categories } = useContext(CategoryContext);

  const [newsData, setNewsData] = useState({
    ...from,
    category: getCategoryId(from.category),
  });
  const [imgUpdate, setImgUpdate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const imgPreview = newsData.news_image
    ? `url(${URL.createObjectURL(newsData.news_image)})`
    : `url(${newsData.image_url})`;

  //TODO: find a more graceful solution
  function getCategoryId(name) {
    let categoryId;

    categories.forEach((category) => {
      if (category.category_name === name) {
        categoryId = category.category_id;
      }
    });

    return categoryId;
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "news_image") {
      const file = event.target.files[0];
      setNewsData({ ...newsData, [name]: file });
      setImgUpdate(true);

      return;
    }

    setNewsData({ ...newsData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();

    formdata.append("id", newsData.id);
    formdata.append("title", newsData.title);
    formdata.append("category", newsData.category);
    formdata.append("description", newsData.description);
    formdata.append("source_url", newsData.source_url);
    formdata.append("caption", newsData.caption);

    if (imgUpdate) {
      formdata.append("news_image", newsData.news_image);
    }

    try {
      setIsSaving(true);

      const response = await makeRequest("news/edit-news", "PUT", formdata);

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      navigate(-1);

      swal("success", response.message);
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
            handleChange={handleChange}
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

        <div className="bg-white p-4 w-1/4 h-60 rounded-xl">
          <div
            className="h-full w-full bg-contain"
            style={{
              backgroundImage: imgPreview,
              backgroundSize: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
