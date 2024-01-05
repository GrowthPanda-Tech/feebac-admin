import { useState, useContext, useRef } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";

import swal from "@/utils/swal";
import dateToday from "@/utils/dateToday";
import dateConvert from "@/utils/dateConvert";
import makeRequest from "@/utils/makeRequest";
import forbidChars from "@/utils/forbidChars";

import upload from "@/assets/upload.png";

//components
import PageTitle from "@helperComps/PageTitle";

function Select({ name, value, onChange, children }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="h-fit w-2/3 rounded-xl border border-[#858585] bg-[#F6F6F6] px-5 py-2 capitalize"
    >
      {children}
    </select>
  );
}

function Input({ type, min, name, onChange }) {
  return (
    <input
      type={type}
      min={min}
      name={name}
      onChange={onChange}
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

export default function CreateSurveyForm({
  setSurveyId,
  setSurveyTitle,
  setIsSurveyCreate,
}) {
  const { categories } = useContext(CategoryContext);

  const [surveyData, setSurveyData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [imgPreview, setImgPreview] = useState({
    surveyImg: null,
    featured_image: null,
  });
  const [loading, setLoading] = useState(false);

  const surveyImgRef = useRef(null);
  const featuredImgRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "startDate" || name === "endDate") {
      const formattedOutput = dateConvert(value, "UTC");
      setSurveyData({ ...surveyData, [name]: formattedOutput });
      return;
    }

    if (name === "surveyImg" || name === "featured_image") {
      const file = e.target.files[0];
      setSurveyData({ ...surveyData, [name]: file });
      setImgPreview({
        ...imgPreview,
        [name]: `url(${URL.createObjectURL(file)})`,
      });

      return;
    }

    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleImgDelete = (type) => {
    setImgPreview({ ...imgPreview, [type]: null });
    setSurveyData({ ...surveyData, [type]: null });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();

    formdata.append("target", JSON.stringify(profileData));

    for (const [key, value] of Object.entries(surveyData)) {
      formdata.append(key, value);
    }

    setLoading(true);

    try {
      const response = await makeRequest(
        "site-admin/create-survey",
        "POST",
        formdata,
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);

      setSurveyId(response.surveyId);
      setSurveyTitle(surveyData.surveyTitle);
      setIsSurveyCreate(response.isSuccess);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Create New Survey"} />

      <div className="grid grid-cols-3 gap-8 ">
        <Label name={"Start Date"}>
          <Input
            type={"datetime-local"}
            min={dateToday()}
            name={"startDate"}
            onChange={handleChange}
          />
        </Label>

        <Label name={"End Date"}>
          <Input
            type={"datetime-local"}
            min={dateToday()}
            name={"endDate"}
            onChange={handleChange}
          />
        </Label>

        <Label name={"Survey Title"}>
          <Input name={"surveyTitle"} onChange={handleChange} />
        </Label>

        <Label name={"Survey Description"}>
          <Input name={"surveyDescription"} onChange={handleChange} />
        </Label>

        <Label name={"Select Research Category"}>
          <Select
            name={"category"}
            value={surveyData.category}
            onChange={handleChange}
          >
            {categories.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label name={"Loyalty Points"}>
          <input
            type="number"
            name="loyaltyPoint"
            onChange={handleChange}
            onKeyDown={(event) => forbidChars(event)}
            onPaste={(event) => forbidChars(event)}
            className="h-fit w-2/3 rounded-xl border border-[#858585] bg-[#F6F6F6] px-5 py-2"
            required
          />
        </Label>
      </div>

      {/* TODO: refactor */}
      <div className="flex gap-24">
        <div className="flex flex-col gap-6">
          <span className="text-xl font-semibold">Upload Image</span>
          <div
            className="relative aspect-[9/16] h-80 rounded-xl border-2 border-dashed border-black"
            style={{
              backgroundImage: imgPreview.surveyImg,
              backgroundSize: "cover",
            }}
          >
            {!imgPreview.surveyImg ? (
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
                  onClick={() => handleImgDelete("surveyImg")}
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
            name="surveyImg"
            hidden
          />
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xl font-semibold">
            Upload Image (for featured section)
          </span>
          <div
            className="relative aspect-[5/4] h-80 rounded-xl border-2 border-dashed border-black"
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

      <button
        className={`${loading ? "btn-secondary" : "btn-primary"} w-fit`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Create"}
      </button>
    </div>
  );
}
