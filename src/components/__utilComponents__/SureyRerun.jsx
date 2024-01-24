import { useState } from "react";
import { useNavigate } from "react-router-dom";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

import confirm_icon from "@/assets/confirm_icon.png";

export default function SurveyRerun(props) {
  const navigate = useNavigate();

  const { setConfirmRerun, rerunInfo, setRerunInfo, setSurveyData } = props;
  const { survey_id } = rerunInfo;

  const [loading, setLoading] = useState(false);

  const handleRerun = async () => {
    setLoading(true);

    try {
      const response = await makeRequest("survey/re-run", "PUT", {
        id: survey_id,
      });

      if (!response.isSuccess) throw new Error(response.message);

      swal("success", response.message);

      setRerunInfo({ survey_id: null, table_index: null });
      setConfirmRerun(false);

      setSurveyData((prev) =>
        prev.filter((_, index) => index !== rerunInfo.table_index),
      );

      navigate(`/survey/edit-survey/${response.data.id}`);
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
            <span>
              A copy of this survey will be created and added to the Drafts
              section. You will be redirected to it&apos;s edit page.
            </span>
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
