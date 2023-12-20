import { useContext } from "react";
import { InsightContext } from "@/contexts/InsightContext";

export default function AddPage() {
  const { insightModel, setInsightModel } = useContext(InsightContext);

  const handleClick = () => {
    const spread = { ...insightModel };
    spread.pages.push("");

    setInsightModel(spread);
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[#BABABA] font-medium leading-snug">
        Page {insightModel.pages.length + 1}
      </span>

      <div className="bg-transparent border border-dashed border-[#00000080] rounded-2xl w-40 h-80 flex items-center justify-center">
        <span
          className="select-none text-[#BCBCBC] text-6xl cursor-pointer"
          onClick={handleClick}
        >
          +
        </span>
      </div>
    </div>
  );
}
