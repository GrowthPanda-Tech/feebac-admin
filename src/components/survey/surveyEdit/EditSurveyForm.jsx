import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";

import dateConvert from "../../../utils/dateConvert";
import dateToday from "../../../utils/dateToday";
import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

function Input({ type, min, value, name, onChange }) {
  return (
    <input
      type={type}
      min={min}
      name={name}
      onChange={onChange}
      value={value}
      className="bg-[#F6F6F6] border border-[#858585] rounded-xl py-2 px-5 h-fit w-2/3"
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

  const [surveyData, setSurveyData] = useState(surveyInfo);
  const [updatedData, setUpdatedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_date" || name === "end_date") {
      const dateUTC = dateConvert(value, "UTC");
      setUpdatedData({ ...updatedData, [name]: dateUTC });

      return;
    }

    setSurveyData({ ...surveyData, [name]: value });
    setUpdatedData({ ...updatedData, [name]: value });
  };

  //TODO: nested API calls?
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();

    formdata.append("survey_id", surveyData.survey_id);

    for (const [key, value] of Object.entries(updatedData)) {
      formdata.append(key, value);
    }

    try {
      const response = await makeRequest(
        "site-admin/update-survey",
        "PUT",
        formdata
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
    }
  };

  return (
    <div className="flex flex-col p-8 gap-8">
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
            className="bg-[#F6F6F6] border border-[#858585] rounded-xl py-2 px-5 h-fit w-2/3 capitalize"
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

      <div className="flex gap-4">
        <button className="btn-primary w-fit" onClick={handleSubmit}>
          Save Changes
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            setSurveyEditPop(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
