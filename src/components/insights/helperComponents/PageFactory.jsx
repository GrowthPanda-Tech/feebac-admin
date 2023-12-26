import { useContext } from "react";
import { InsightContext } from "@/contexts/InsightContext";

import AddPage from "./AddPage";
import ImgPicker from "./ImgPicker";

export default function PageFactory() {
  const { insightModel } = useContext(InsightContext);

  return (
    <div className="flex flex-wrap gap-8">
      {insightModel.pages.map((_, idx) => (
        <div className="flex flex-col gap-3" key={idx}>
          <span className="font-medium leading-snug text-accent">
            Page {idx + 1}
          </span>

          <ImgPicker idx={idx} />
        </div>
      ))}

      <AddPage />
    </div>
  );
}
