import { useContext } from "react";
import { InsightContext } from "@/contexts/InsightContext";

export default function FormInput() {
  const { insightModel, setInsightModel } = useContext(InsightContext);

  return (
    <label className="flex w-full flex-col gap-4">
      <span className="text-lg font-semibold capitalize">Caption</span>
      <input
        className="rounded-xl border border-[#1D1D1D] bg-white px-10 py-5"
        name="caption"
        value={insightModel.caption}
        onChange={(e) =>
          setInsightModel({
            ...insightModel,
            caption: e.target.value,
          })
        }
        required
      />
    </label>
  );
}
