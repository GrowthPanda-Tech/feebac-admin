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
    <div className="flex gap-4 flex-col">
      <span className="text-lg capitalize font-semibold">Background Image</span>
      <input
        name="image"
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={(e) => handleChange(e)}
        hidden
      />

      <div className="bg-white border border-[#1D1D1D] rounded-xl py-5 px-10 flex justify-between">
        <span>{insightModel.image ? insightModel.image.name : " "}</span>
        <span
          className="text-secondary cursor-pointer hover:text-primary font-semibold"
          onClick={() => imgRef.current.click()}
        >
          Upload
        </span>
      </div>
    </div>
  );
}
