import { useContext, useState, useRef } from "react";
import { InsightContext } from "@/contexts/InsightContext";

import uploadArrow from "@/assets/upload.png";
import deleteIcon from "@/assets/delete.svg";

export default function ImgPicker({ idx }) {
  const { insightModel, setInsightModel } = useContext(InsightContext);
  const [imgPreview, setImgPreview] = useState(null);
  const imgRef = useRef(null);

  const handleDelete = () => {
    const spread = { ...insightModel };
    spread.pages.splice(idx, 1);

    setInsightModel(spread);
    setImgPreview(null);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    const spread = { ...insightModel };
    spread.pages[idx] = file;

    setInsightModel(spread);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImgPreview(reader.result);
  };

  const background = insightModel.image
    ? `url(${URL.createObjectURL(insightModel.image)})`
    : "none";

  return (
    //TODO: uh...
    <div
      className={`relative flex h-80 w-40 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#00000080] bg-white px-3 text-center text-sm`}
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
      }}
    >
      {imgPreview ? (
        <img src={imgPreview} />
      ) : (
        <>
          <img src={uploadArrow} className="w-10" />
          <span className="font-medium">Drag & Drop Image</span>
          <span>
            Or{" "}
            <span
              className="cursor-pointer text-secondary underline"
              onClick={() => imgRef.current.click()}
            >
              browse file
            </span>{" "}
            on your computer
          </span>
          <input
            onChange={(e) => handleChange(e)}
            ref={imgRef}
            type="file"
            accept="image/png"
            name="pages"
            hidden
          />
        </>
      )}
      <img
        src={deleteIcon}
        className="absolute right-0 top-0 cursor-pointer p-4 text-lg"
        onClick={handleDelete}
      />
    </div>
  );
}
