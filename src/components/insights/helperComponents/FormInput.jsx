import { useContext } from "react";
import { InsightContext } from "@/contexts/InsightContext";

export default function FormInput() {
  const { insightModel, setInsightModel } = useContext(InsightContext);

  return (
    <label className="flex flex-col gap-4 w-full">
      <span className="font-semibold text-lg capitalize">Caption</span>
      <input
        className="py-5 px-10 rounded-xl bg-white border border-[#1D1D1D]"
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
