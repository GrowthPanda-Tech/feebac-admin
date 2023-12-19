import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { INIT_STATE, InsightContext } from "@/contexts/InsightContext";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

export default function SubmitButton() {
  const { insightModel, setInsightModel } = useContext(InsightContext);
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("image", insightModel.image, insightModel.image.name);
    formData.append("caption", insightModel.caption);

    insightModel.pages.forEach((page) => {
      formData.append("pages", page, page.name);
    });

    setIsSubmit(true);

    try {
      const response = await makeRequest(
        "insights/create-insights",
        "POST",
        formData
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);
      setInsightModel(INIT_STATE);
      navigate("/insights");
    } catch (error) {
      swal("error", error.message);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <button
      className={`${isSubmit ? "btn-secondary" : "btn-primary"} w-fit`}
      type="submit"
      onClick={handleSubmit}
      disabled={isSubmit ? true : false}
    >
      {isSubmit ? "Submitting..." : "Create Insight"}
    </button>
  );
}
