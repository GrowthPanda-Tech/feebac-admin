import { useState, useContext, useRef, useEffect } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";
import { useFilterContext } from "@/contexts/FilterContext";

//utils
import swal from "@/utils/swal";
import dateToday from "@/utils/dateToday";
import makeRequest from "@/utils/makeRequest";
import forbidChars from "@/utils/forbidChars";
import { makeParams } from "@/utils/makeParams";

//assets
import upload from "@/assets/upload.png";

//components
import PageTitle from "@helperComps/PageTitle";
import Button from "@helperComps/Button";
import FilterSection from "./FilterSection";
import TargetCountSection from "./TargetCountSection";
import fileReader from "@/utils/fileReader";

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

const INIT_SURVEY_DATA = {
  startDate: null,
  endDate: null,
  surveyTitle: "",
  surveyDescription: "",
  loyaltyPoint: "",
  category: null,
  surveyImg: null,
  featured_image: null,
};

const INIT_TARGET_DATA = {
  //primary
  country: null,
  state: null,
  city: null,
  age: null,
  //secondary
};

export default function CreateSurveyForm({
  setSurveyId,
  setSurveyTitle,
  setIsSurveyCreate,
}) {
  const { categories } = useContext(CategoryContext);
  const { setFetchedData } = useFilterContext();

  const [loading, setLoading] = useState(false);
  const [surveyData, setSurveyData] = useState(INIT_SURVEY_DATA);
  const [target, setTarget] = useState(INIT_TARGET_DATA);
  const [count, setCount] = useState({ total: 0, target: 0 });
  const [imgPreview, setImgPreview] = useState({
    surveyImg: null,
    featured_image: null,
  });

  const paramObj = { country: target.country, state: target.state };
  const params = makeParams(paramObj);
  const route = `config/get-profile-key-value?${params}`;

  const surveyImgRef = useRef(null);
  const featuredImgRef = useRef(null);

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "startDate" || name === "endDate") {
      const formattedDate = `${value}:00.000`;
      setSurveyData({ ...surveyData, [name]: formattedDate });
      return;
    }

    if (name === "surveyImg" || name === "featured_image") {
      const file = e.target.files[0];

      try {
        await fileReader(file);

        setSurveyData({ ...surveyData, [name]: file });
        setImgPreview({
          ...imgPreview,
          [name]: `url(${URL.createObjectURL(file)})`,
        });
      } catch (error) {
        swal("error", error.message);
      }

      return;
    }

    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleImgDelete = (type) => {
    setImgPreview({ ...imgPreview, [type]: null });
    setSurveyData({ ...surveyData, [type]: null });
  };

  const handleCount = async () => {
    setLoading(true);

    //trim out null value keys
    const filteredTarget = Object.fromEntries(
      Object.entries(target).filter(([, value]) => value !== null),
    );

    try {
      const response = await makeRequest(
        `site-admin/get-target-profile-count?target=${JSON.stringify(
          filteredTarget,
        )}`,
      );
      if (!response.isSuccess) throw new Error(response.message);
      setCount((prev) => ({ ...prev, target: response.data }));
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();

    //check if it an empty object or not
    //and trim any null or empty arrays
    if (Object.keys(target).length > 0) {
      const trimmedTarget = Object.fromEntries(
        Object.entries(target).filter(([, value]) => {
          return (
            value !== null && !(Array.isArray(value) && value.length === 0)
          );
        }),
      );

      if (Object.keys(trimmedTarget).length > 0) {
        formdata.append("target", JSON.stringify(trimmedTarget));
      }
    }

    for (const [key, value] of Object.entries(surveyData)) {
      if (key === "category" && !value) {
        formdata.append(key, categories[0].category_id);
        continue;
      }

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

  //TODO: I ain't proud
  useEffect(() => {
    let ignore = false;

    async function handleLocationFetch() {
      try {
        const response = await makeRequest(route);
        if (!response.isSuccess) throw new Error(response.message);
        if (!ignore) setFetchedData(response);
      } catch (error) {
        swal("error", error.message);
      }
    }

    handleLocationFetch();

    return () => (ignore = true);
  }, [route, setFetchedData]);

  //TODO: still not
  useEffect(() => {
    let ignore = false;

    const getTotalCount = async () => {
      try {
        const response = await makeRequest(
          "site-admin/get-target-profile-count?target={}",
        );
        if (!response.isSuccess) throw new Error(response.message);
        if (!ignore) setCount((prev) => ({ ...prev, total: response.data }));
      } catch (error) {
        swal("error", error.message);
      }
    };

    getTotalCount();

    return () => (ignore = true);
  }, []);

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

      {/* Target Count Section */}
      <TargetCountSection count={count} />

      {/* Filter Section */}
      <FilterSection route={route} target={target} setTarget={setTarget} />

      <div className="flex gap-6">
        <Button
          loading={loading}
          handler={handleCount}
          action={"get user count"}
          secondary
        />
        <Button loading={loading} handler={handleSubmit} action={"create"} />
      </div>
    </div>
  );
}
