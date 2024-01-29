import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { surveyActions } from "@/utils/buttonHandlers";

export default function QuestionActions({ surveyId }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState({
    publish: false,
    schedule: false,
  });

  return (
    <div className="flex justify-center gap-6">
      <button
        type="button"
        className="btn-secondary bg-white disabled:cursor-not-allowed disabled:bg-light-grey"
        disabled={loading.publish}
        onClick={() =>
          surveyActions({
            type: "publish",
            surveyId,
            setLoading,
            navigate,
          })
        }
      >
        {loading.publish ? "Publishing..." : "Publish"}
      </button>
      <button
        type="button"
        className="btn-primary disabled:cursor-not-allowed disabled:bg-light-grey"
        disabled={loading.schedule}
        onClick={() =>
          surveyActions({
            type: "schedule",
            surveyId,
            setLoading,
            navigate,
          })
        }
      >
        {loading.schedule ? "Scheduling..." : "Schedule"}
      </button>
    </div>
  );
}
