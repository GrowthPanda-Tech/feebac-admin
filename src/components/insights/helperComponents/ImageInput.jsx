//hooks
import { useRef } from "react";

//utils
import fileReader from "@/utils/fileReader";
import swal from "@/utils/swal";

export default function ImageInput({ image, setter }) {
  const imgRef = useRef(null);

  const fileName = !image
    ? ""
    : image instanceof File
    ? image.name
    : image.split("/").pop();

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        await fileReader(file);
        setter((prev) => ({ ...prev, image: file }));
      } catch (error) {
        swal("error", error.message);
      }
    }
  };

  return (
    <div className="flex w-2/3 flex-col gap-4">
      <span className="text-lg font-semibold capitalize">Background Image</span>
      <input
        name="image"
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={(e) => handleChange(e)}
        hidden
      />

      <div className="flex justify-between gap-10 rounded-xl border border-[#1D1D1D] bg-white px-10 py-5">
        <span className="truncate">{fileName}</span>
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
