import { useRef } from "react";

export default function ImageInput({ image, setter }) {
  const imgRef = useRef(null);

  const fileName = !image
    ? ""
    : image instanceof File
    ? image.name
    : image.split("/").pop();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setter((prev) => ({ ...prev, image: file }));
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
        <span>{fileName}</span>
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
