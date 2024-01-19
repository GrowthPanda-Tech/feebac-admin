import { useState } from "react";

import { calculateRuntime } from "@/utils/calculateRuntime";
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

import confirm_icon from "@/assets/confirm_icon.png";

export default function SurveyRerun(props) {
  const { setConfirmRerun, rerunInfo, setRerunInfo, setSurveyData } = props;
  const { start_date, end_date } = rerunInfo;
  const { newStartLocal, newEndLocal } = calculateRuntime(start_date, end_date);

  const [startDate, startTime] = newStartLocal.split(",");
  const [endDate, endTime] = newEndLocal.split(",");

  const [loading, setLoading] = useState(false);

  const handleRerun = async () => {
    setLoading(true);

    try {
      const response = await makeRequest("survey/re-run", "PUT", {
        id: rerunInfo.survey_id,
      });

      if (!response.isSuccess) throw new Error(response.message);

      swal("success", response.message);

      setRerunInfo({ survey_id: null, start_time: null, end_time: null });
      setConfirmRerun(false);

      setSurveyData((prev) =>
        prev.filter((_, index) => index !== rerunInfo.table_index),
      );
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center`}
    >
      <div className="flex w-[25vw] flex-col items-center justify-between gap-6 rounded-xl bg-white p-8">
        <div className="flex flex-col items-center gap-4">
          <img src={confirm_icon} alt="confirm_icon" />
          <div className="flex flex-col items-center text-xl font-medium">
            <span>Are you sure you want to re-run this survey ?</span>
          </div>

          {/* TODO: should I make a component for this? */}
          <span className="flex flex-wrap gap-1 font-light opacity-50">
            <span>The survey will run from</span>
            <span className="font-semibold">{startDate}</span>
            <span>-</span>
            <span className="font-semibold">{endDate}</span>
            <span>,</span>
            <span className="font-semibold">{startTime}</span>
            <span>-</span>
            <span className="font-semibold">{endTime}</span>
          </span>
        </div>

        <div className="flex gap-7">
          <button
            className="btn-secondary"
            onClick={() => setConfirmRerun(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn-primary disabled:btn-secondary"
            onClick={handleRerun}
            disabled={loading}
          >
            {loading ? "Loading..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
