import { useContext, useRef } from "react";
import { InsightContext } from "@/contexts/InsightContext";

export default function ImageInput() {
  const { insightModel, setInsightModel } = useContext(InsightContext);

  const imgRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setInsightModel({ ...insightModel, image: file });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg font-semibold capitalize">Background Image</span>
      <input
        name="image"
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={(e) => handleChange(e)}
        hidden
      />

      <div className="flex justify-between rounded-xl border border-[#1D1D1D] bg-white px-10 py-5">
        <span>{insightModel.image ? insightModel.image.name : " "}</span>
        <span
          className="cursor-pointer font-semibold text-secondary hover:text-primary"
          onClick={() => imgRef.current.click()}
        >
          Upload
        </span>
      </div>
    </div>
  );
}
