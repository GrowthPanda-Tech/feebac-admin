import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { INIT_STATE, InsightContext } from "../../../contexts/InsightContext";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

export default function SubmitButton() {
  const { insightModel, setInsightModel } = useContext(InsightContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("image", insightModel.image, insightModel.image.name);
    formData.append("caption", insightModel.caption);

    insightModel.pages.forEach((page) => {
      formData.append("pages", page, page.name);
    });

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
    }
  };

  return (
    <button
      className="w-fit py-3 px-7 transition bg-[#EA525F] hover:bg-[#EA8552] text-white font-semibold rounded-xl"
      type="submit"
      onClick={handleSubmit}
    >
      Create Insight
    </button>
  );
}
