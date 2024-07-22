//hooks and stuff
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

//utils
import swal from "@/utils/swal";
import makeRequest from "@/utils/makeRequest";
import fileReader from "@/utils/fileReader";

//compoenents
import ContentForm from "./ContentForm";
import PageTitle from "@helperComps/PageTitle";

export default function ContentEdit() {
  const { slug } = useParams();

  const editorRef = useRef(null);
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState({});
  const [imgPreview, setImgPreview] = useState(articleData?.image_url);
  const [imgUpdate, setImgUpdate] = useState({
    isUpdate: false,
    articleImg: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = async (event) => {
    if (event.target.name === "articleImg") {
      const file = event.target.files[0];

      if (file) {
        try {
          const preview = await fileReader(file);

          setImgPreview(preview);
          setImgUpdate({ isUpdate: true, articleImg: file });
        } catch (error) {
          swal("error", error.message);
        }
      }

      return;
    }

    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const articleContent = editorRef.current.getContent();
    const {
      article_id,
      article_title,
      article_description,
      category,
      caption,
    } = articleData;

    const formData = new FormData();

    formData.append("articleId", article_id);
    formData.append("articleTitle", article_title);
    formData.append("articleDescription", article_description);
    formData.append("articleContent", articleContent);
    formData.append("category", category);
    formData.append("caption", caption);
    formData.append("isUpdateImage", imgUpdate.isUpdate);

    if (imgUpdate.isUpdate) {
      formData.append(
        "articleImg",
        imgUpdate.articleImg,
        imgUpdate.articleImg.name,
      );
    }

    try {
      setIsSaving(true);

      const response = await makeRequest(
        "site-admin/update-article",
        "PUT",
        formData,
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
          `site-admin/show-article-info?articleId=${slug}`,
        );

        if (!response.isSuccess) throw new Error(response.message);

        if (!ignore) {
          const flatResponse = {
            ...response.articleInfo,
            category: response.articleInfo.category.category_id,
          };

          setArticleData(flatResponse);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    getArticleInfo();

    return () => {
      ignore = true;
    };
  }, [slug]);

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Edit Article"} />
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="md:w-3/4">
          <ContentForm
            articleData={articleData}
            handleChange={handleChange}
            editorRef={editorRef}
            isSaving={isSaving}
          />

          <button
            onClick={handleSubmit}
            className={`${
              isSaving ? "btn-secondary" : "btn-primary"
            }  mt-8 w-fit`}
            disabled={isSaving}
          >
            <i className="fa-solid fa-pen-to-square mr-2"></i>
            {isSaving ? "Saving..." : "Save Edit"}
          </button>
        </div>

        <div className="flex h-60 items-center justify-center rounded-xl bg-white p-4 md:w-1/4">
          <img
            src={imgPreview || articleData.image_url}
            className="max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
