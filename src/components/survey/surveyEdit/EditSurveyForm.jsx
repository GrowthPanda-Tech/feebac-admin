import { useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";

import dateConvert from "../../../utils/dateConvert";
import dateToday from "../../../utils/dateToday";
import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

import upload from "../../../assets/upload.png";

function Input({ type, min, value, name, onChange }) {
  return (
    <input
      type={type}
      min={min}
      name={name}
      onChange={onChange}
      value={value}
      className="h-fit w-2/3 rounded-xl border border-[#858585] bg-[#F6F6F6] px-5 py-2"
      required
    />
  );
}

function Label({ name, children }) {
  return (
    <label className="flex items-center gap-2">
      <span className="font-medium">{name}*</span>
      {children}
    </label>
  );
}

export default function EditSurveyForm({
  setSurveyEditPop,
  surveyInfo,
  setSurveyInfo,
}) {
  const { slug } = useParams();
  const { categories } = useContext(CategoryContext);

  const [loading, setLoading] = useState(false);
  const [surveyData, setSurveyData] = useState(surveyInfo);
  const [updatedData, setUpdatedData] = useState(null);
  const [imgPreview, setImgPreview] = useState({
    image_url: `url(${surveyData.image_url})`,
    featured_image: `url(${surveyData.featured_image})`,
  });

  const surveyImgRef = useRef(null);
  const featuredImgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_date" || name === "end_date") {
      const dateUTC = dateConvert(value, "UTC");
      setSurveyData({ ...surveyData, [name]: value });
      setUpdatedData({ ...updatedData, [name]: dateUTC });

      return;
    }

    if (name === "image_url" || name === "featured_image") {
      const file = e.target.files[0];

      setUpdatedData({ ...updatedData, [name]: file });
      setImgPreview({
        ...imgPreview,
        [name]: `url(${URL.createObjectURL(file)})`,
      });

      return;
    }

    setSurveyData({ ...surveyData, [name]: value });
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleImgDelete = (type) => {
    setImgPreview({ ...imgPreview, [type]: null });
    setSurveyData({ ...surveyData, [type]: null });
  };

  //TODO: nested API calls?
  const handleSubmit = async (event) => {
    if (!updatedData) {
      swal("error", "Blank image fields are not allowed");
      return;
    }

    event.preventDefault();
    const formdata = new FormData();

    formdata.append("survey_id", surveyData.survey_id);

    for (const [key, value] of Object.entries(updatedData)) {
      if (value) formdata.append(key, value);
    }

    setLoading(true);

    try {
      const response = await makeRequest(
        "site-admin/update-survey",
        "PUT",
        formdata,
      );

      if (response.isSuccess) {
        swal("success", response.message);
        const getData = async () => {
          const response = await makeRequest(`survey/show-survey?sid=${slug}`);
          if (response.isSuccess) {
            setSurveyInfo(response.surveyInfo);
          }
        };

        getData();

        setSurveyEditPop(false);
      } else swal("error", response.message);
    } catch (error) {
      swal("error", "Please Enter Valid Value");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="heading mb-0"> Edit Survey Details </h1>

      <div className="grid grid-cols-3 gap-8 ">
        <Label name={"Start Date"}>
          <Input
            type={"datetime-local"}
            min={dateToday()}
            value={dateConvert(surveyData.start_date, "localISO")}
            name={"start_date"}
            onChange={handleChange}
          />
        </Label>

        <Label name={"End Date"}>
          <Input
            type={"datetime-local"}
            min={dateToday()}
            name={"end_date"}
            onChange={handleChange}
            value={dateConvert(surveyData.end_date, "localISO")}
          />
        </Label>

        <Label name={"Survey Title"}>
          <Input
            name={"survey_title"}
            value={surveyData.survey_title}
            onChange={handleChange}
          />
        </Label>

        <Label name={"Survey Description"}>
          <Input
            name={"survey_description"}
            value={surveyData.survey_description}
            onChange={handleChange}
          />
        </Label>

        <Label name={"Select Research Category"}>
          <select
            name="category"
            value={surveyData.category.category_id}
            onChange={handleChange}
            className="h-fit w-2/3 rounded-xl border border-[#858585] bg-[#F6F6F6] px-5 py-2 capitalize"
          >
            {categories.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </select>
        </Label>

        <Label name={"Loyalty Points Per Use"}>
          <Input
            type={"number"}
            name={"loyalty_point"}
            onChange={handleChange}
            value={surveyData.loyalty_point}
          />
        </Label>
      </div>

      {/* Images */}
      {/* TODO: Needs refactor */}
      <div className="flex gap-24">
        <div className="flex flex-col gap-6">
          <span className="text-xl font-semibold">Upload Image</span>
          <div
            className={`relative aspect-[9/16] h-80 ${
              !imgPreview.image_url ? "border-dashed" : ""
            } rounded-xl border-2 border-black`}
            style={{
              backgroundImage: imgPreview.image_url,
              backgroundSize: "cover",
            }}
          >
            {!imgPreview.image_url ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
                <img src={upload} className="w-12" />
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-secondary">
                    Drag & Drop
                  </span>
                  <span className="font-semibold">Image</span>
                </div>
                <span className="flex flex-col items-center gap-1 text-xs">
                  <span>Or</span>
                  <span
                    className={`cursor-pointer font-semibold text-secondary underline hover:text-primary`}
                    onClick={() => surveyImgRef.current.click()}
                  >
                    browse files
                  </span>
                  <span>on your computer</span>
                </span>
              </div>
            ) : (
              <div className="absolute right-0 top-0">
                <i
                  className="fa-solid fa-trash-can cursor-pointer p-4 text-xl"
                  onClick={() => handleImgDelete("image_url")}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            )}
          </div>

          <input
            onChange={handleChange}
            ref={surveyImgRef}
            type="file"
            accept="image/*"
            name="image_url"
            hidden
          />
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xl font-semibold">
            Upload Image (for featured section)
          </span>
          <div
            className={`relative aspect-[5/4] h-80 ${
              !imgPreview.featured_image ? "border-dashed" : ""
            } rounded-xl border-2 border-black`}
            style={{
              backgroundImage: imgPreview.featured_image,
              backgroundSize: "cover",
            }}
          >
            {!imgPreview.featured_image ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
                <img src={upload} className="w-12" />
                <div className="flex gap-2">
                  <span className="font-semibold text-secondary">
                    Drag & Drop
                  </span>
                  <span className="font-semibold">Image</span>
                </div>
                <span className="flex gap-1 text-xs">
                  <span>Or</span>
                  <span
                    className={`cursor-pointer font-semibold text-secondary underline hover:text-primary`}
                    onClick={() => featuredImgRef.current.click()}
                  >
                    browse files
                  </span>
                  <span>on your computer</span>
                </span>
              </div>
            ) : (
              <div className="absolute right-0 top-0">
                <i
                  className="fa-solid fa-trash-can cursor-pointer p-4 text-xl"
                  onClick={() => handleImgDelete("featured_image")}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            )}
          </div>

          <input
            onChange={handleChange}
            ref={featuredImgRef}
            type="file"
            accept="image/*"
            name="featured_image"
            hidden
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="btn-primary disabled:btn-secondary w-fit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            setSurveyEditPop(false);
          }}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
