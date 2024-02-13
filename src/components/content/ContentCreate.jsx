//hooks and stuff
import { useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContext } from "@/contexts/CategoryContext";

//utils
import swal from "@/utils/swal";
import makeRequest from "@/utils/makeRequest";
import fileReader from "@/utils/fileReader";

//assets
import defaultImgPreview from "@/assets/defaultImgPreview.png";

//compoenents
import ContentForm from "./ContentForm";
import PageTitle from "@helperComps/PageTitle";

export default function ContentCreate({ surveyId }) {
  const { slug } = useParams();
  const { categories } = useContext(CategoryContext);

  const editorRef = useRef(null);
  const navigate = useNavigate();

  // states
  const [articleData, setArticleData] = useState({
    surveyId: surveyId || null,
    category: categories[0]?.category_id || "",
  });
  const [imgPreview, setImgPreview] = useState(defaultImgPreview);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = async (event) => {
    if (event.target.name === "articleImg") {
      const file = event.target.files[0];

      if (file) {
        try {
          const preview = await fileReader(file);

          setImgPreview(preview);
          setArticleData({ ...articleData, [event.target.name]: file });
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
      article_title,
      article_description,
      category,
      caption,
      articleImg,
    } = articleData;

    const formData = new FormData();

    formData.append("articleTitle", article_title);
    formData.append("articleDescription", article_description);
    formData.append("articleContent", articleContent);
    formData.append("category", category);
    formData.append("caption", caption);

    if (articleImg) formData.append("articleImg", articleImg);
    if (slug) formData.append("surveyId", slug);

    try {
      setIsSaving(true);

      const response = await makeRequest(
        "site-admin/create-article",
        "POST",
        formData,
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);
      navigate("/content");
    } catch (error) {
      swal("error", error.message);
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
              editorRef={editorRef}
              isSaving={isSaving}
            />
            <button
              className={`${
                isSaving ? "btn-secondary" : "btn-primary"
              }  mt-8 w-fit`}
              disabled={isSaving}
            >
              <i className="fa-solid fa-floppy-disk mr-2"></i>
              {isSaving ? "Saving..." : "Save Drafts"}
            </button>
          </form>
        </div>

        <div className="flex h-60 w-1/4 items-center justify-center rounded-xl bg-white p-4">
          <img src={imgPreview} className="max-h-full max-w-full" />
        </div>
      </div>
    </div>
  );
}
