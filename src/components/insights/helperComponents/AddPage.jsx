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
      <span className="font-medium leading-snug text-[#BABABA]">
        Page {insightModel.pages.length + 1}
      </span>

      <div className="flex h-80 w-40 items-center justify-center rounded-2xl border border-dashed border-[#00000080] bg-transparent">
        <span
          className="cursor-pointer select-none text-6xl text-[#BCBCBC]"
          onClick={handleClick}
        >
          +
        </span>
      </div>
    </div>
  );
}
