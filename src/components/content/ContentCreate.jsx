import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";

import swal from "../../utils/swal";
import makeRequest from "../../utils/makeRequest";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

import ContentForm from "./ContentForm";
import PageTitle from "../_helperComponents/PageTitle";

export default function ContentCreate({ surveyId }) {
  const { categories } = useContext(CategoryContext);
  const initCat = categories[0]?.category_id ? categories[0].category_id : "";

  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    surveyId: surveyId ? surveyId : null,
    category: initCat,
  });
  const [imgPreview, setImgPreview] = useState(defaultImgPreview);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "articleImg") {
      const file = event.target.files[0];
      setArticleData({ ...articleData, [event.target.name]: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImgPreview(reader.result);
        reader.readAsDataURL(file);
      }

      return;
    }

    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditorChange = (content) =>
    setArticleData({ ...articleData, article_content: content });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("articleTitle", articleData.article_title);
    formData.append("articleDesctiption", articleData.article_desctiption);
    formData.append("articleContent", articleData.article_content);
    formData.append("category", articleData.category);
    formData.append("caption", articleData.caption);
    articleData.articleImg &&
      formData.append(
        "articleImg",
        articleData.articleImg,
        articleData.articleImg.name
      );

    try {
      setIsSaving(true);

      const response = await makeRequest(
        "site-admin/create-article",
        "POST",
        formData
      );

      if (response.isSuccess) {
        swal("success", response);
        setTimeout(() => {
          navigate("/content");
        }, 1200);
      } else swal("failed", response);
    } catch (error) {
      swal("error", "", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Create New Article"} />
      <div className="flex gap-8">
        <div className="w-3/4">
          <form onSubmit={handleSubmit}>
            <ContentForm
              articleData={articleData}
              handleChange={handleChange}
              handleEditorChange={handleEditorChange}
              isSaving={isSaving}
            />
            <button
              className={`${
                isSaving ? "btn-secondary" : "btn-primary"
              }  w-fit mt-8`}
              disabled={isSaving}
            >
              <i className="fa-solid fa-floppy-disk mr-2"></i>
              {isSaving ? "Saving..." : "Save Drafts"}
            </button>
          </form>
        </div>

        <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
          <img src={imgPreview} className="max-h-full max-w-full" />
        </div>
      </div>
    </div>
  );
}
