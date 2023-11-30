import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

import defaultImgPreview from "../../assets/defaultImgPreview.png";

import ContentForm from "./ContentForm";
import PageTitle from "../_helperComponents/PageTitle";

export default function ContentEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState({});
  const [imgPreview, setImgPreview] = useState(defaultImgPreview);
  const [imgUpdate, setImgUpdate] = useState({
    isUpdate: false,
    articleImg: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "articleImg") {
      const file = event.target.files[0];
      setImgUpdate({ isUpdate: true, articleImg: file });

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

    formData.append("articleId", articleData.article_id);
    formData.append("articleTitle", articleData.article_title);
    formData.append("articleDesctiption", articleData.article_desctiption);
    formData.append("articleContent", articleData.article_content);
    formData.append("caption", articleData.caption);
    formData.append("category", articleData.category);
    formData.append("isUpdateImage", imgUpdate.isUpdate);

    if (imgUpdate.isUpdate) {
      formData.append(
        "articleImg",
        imgUpdate.articleImg,
        imgUpdate.articleImg.name
      );
    }

    try {
      setIsSaving(true);

      const response = await makeRequest(
        "/site-admin/update-article",
        "PUT",
        formData
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);
      navigate(-1);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function getArticleInfo() {
      try {
        const response = await makeRequest(
          `site-admin/show-article-info?articleId=${slug}`
        );

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          const antiAnwarObj = {
            ...response.articleInfo,
            category: response.articleInfo.category.category_id,
          };
          setArticleData(antiAnwarObj);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    getArticleInfo();

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Edit Article"} />
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="md:w-3/4">
          <ContentForm
            articleData={articleData}
            handleChange={handleChange}
            handleEditorChange={handleEditorChange}
            isSaving={isSaving}
          />

          <button
            onClick={handleSubmit}
            className={`${
              isSaving ? "btn-secondary" : "btn-primary"
            }  w-fit mt-8`}
            disabled={isSaving}
          >
            <i className="fa-solid fa-pen-to-square mr-2"></i>
            {isSaving ? "Saving..." : "Save Edit"}
          </button>
        </div>

        <div className="md:w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
          <img
            src={articleData.image_url ? articleData.image_url : imgPreview}
            className="max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
