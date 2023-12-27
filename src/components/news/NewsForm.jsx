import { useNavigate } from "react-router-dom";
import { useState, useContext, useMemo, useRef } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

//components
import CategorySelector from "./utilComponents/CategorySelector";
import AccentInput from "@helperComps/AccentInput";
import BannerTypeSlider from "@utilComps/BannerTypeSlider";

//utils
import swal from "@/utils/swal";
import makeRequest from "@/utils/makeRequest";
import fileReader from "@/utils/fileReader";

//assets
import defaultPreview from "@/assets/defaultImgPreview.png";
import pencil_edit from "@/assets/pencil_edit.png";
import trash_can from "@/assets/trash_can.png";

export default function NewsForm({ newsData }) {
  const { categories } = useContext(CategoryContext);
  const imgRef = useRef(null);
  const navigate = useNavigate();

  /* INIT VALUES */
  //this model won't break i promise
  const INIT_STATE = useMemo(() => {
    const {
      id,
      title,
      description,
      source_url,
      category,
      caption,
      banner_type,
      banner,
    } = newsData || {};

    const defaultCategory = categories[0]?.category_id || null;

    return {
      id: id || null,
      title: title || "",
      description: description || "",
      source_url: source_url || "",
      category: category?.category_id || defaultCategory,
      caption: caption || "",
      banner_type: banner_type || "image",
      banner: banner || null,
    };
  }, [newsData, categories]);

  //neither will this. wait!! this ain't a model.
  const INIT_PREVIEW = useMemo(() => {
    return INIT_STATE.banner_type === "image" && INIT_STATE.banner
      ? INIT_STATE.banner
      : defaultPreview;
  }, [INIT_STATE.banner_type, INIT_STATE.banner]);

  //states
  const [newsState, setNewsState] = useState(INIT_STATE);
  const [preview, setPreview] = useState(INIT_PREVIEW);
  const [loading, setLoading] = useState(false);

  /* event handlers */

  //input handler
  const handleChange = async (e) => {
    let { name, value } = e.target;

    if (name === "category") value = parseInt(value);
    setNewsState((prev) => ({ ...prev, [name]: value }));
  };

  //banner type handler
  const handleTypeChange = (type) => {
    if (type === "video") {
      imgRef.current.value = null;
      setPreview(defaultPreview);
    }

    setNewsState((prev) => ({ ...prev, banner_type: type, banner: null }));
  };

  //banner image handler
  const handleImgChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewsState((prev) => ({ ...prev, banner: file }));

      try {
        const preview = await fileReader(file);
        setPreview(preview);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //banner image remove handler
  const handleImgRemove = () => {
    setPreview(defaultPreview);
    setNewsState((prev) => ({ ...prev, banner_image: null }));
    imgRef.current.value = null;
  };

  //submit handler (captain obvious)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    for (const [key, value] of Object.entries(newsState)) {
      if (!value) continue;
      formdata.append(key, value);
    }

    const route = newsData ? "news/edit-news" : "news/create-news";
    const method = newsData ? "PUT" : "POST";

    setLoading(true);

    try {
      const response = await makeRequest(route, method, formdata);
      if (!response.isSuccess) throw new Error(response.message);

      swal("success", response.message);
      navigate(-1);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-16">
        <div className="flex w-3/4 flex-col justify-between gap-8">
          <div className="flex gap-6">
            <div className="w-1/2">
              <AccentInput
                name="title"
                value={newsState.title}
                handleChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="w-1/2">
              <CategorySelector
                value={newsState.category}
                handleChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <AccentInput
            label={"Source URL"}
            name="source_url"
            type="url"
            pattern="https://.*"
            placeholder="https://example.com"
            value={newsState.source_url}
            disabled={loading}
            handleChange={handleChange}
          />

          {newsState.banner_type === "video" ? (
            <AccentInput
              label={"Video URL"}
              name="banner"
              type="url"
              pattern="https://.*"
              placeholder="https://example.com"
              value={newsState.banner}
              disabled={loading}
              handleChange={handleChange}
            />
          ) : null}

          <AccentInput
            label={"Caption (Optional)"}
            name="caption"
            placeholder="Click here to read more"
            value={newsState.caption}
            disabled={loading}
            handleChange={handleChange}
          />

          <label className="flex flex-col gap-2">
            <span className="font-semibold">Description</span>
            <textarea
              className="rounded-xl border-2 border-[#EA8552] p-8"
              label={"Description"}
              name={"description"}
              rows={10}
              disabled={loading}
              value={newsState.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="flex w-1/4 flex-col gap-12">
          <div className="h-fit rounded-[2rem]">
            <BannerTypeSlider
              type={newsState.banner_type}
              handleChange={handleTypeChange}
            />
          </div>

          <div
            className={`flex flex-col gap-4 transition ${
              newsState.banner_type === "video" &&
              "cursor-not-allowed opacity-50"
            }`}
          >
            <div className="flex h-60 items-center justify-center rounded-xl bg-white p-4 shadow-md">
              <img src={preview} className="max-h-full max-w-full" />
            </div>

            <div className="flex justify-evenly">
              <button
                disabled={newsState.banner_type === "video"}
                onClick={() => imgRef.current.click()}
                className="flex items-center gap-1 font-medium text-secondary disabled:cursor-not-allowed"
              >
                <span>Upload Image</span>
                <img src={pencil_edit} className="h-4" />
              </button>
              <button
                disabled={newsState.banner_type === "video"}
                onClick={handleImgRemove}
                className="flex items-center gap-1 font-medium text-secondary disabled:cursor-not-allowed"
              >
                <span>Remove Image</span>
                <img src={trash_can} className="h-4" />
              </button>
            </div>

            <input
              name="banner"
              type="file"
              accept="image/*"
              ref={imgRef}
              onChange={handleImgChange}
              hidden
            />
          </div>
        </div>
      </div>

      <button
        className="btn-primary disabled:btn-secondary w-fit disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}
