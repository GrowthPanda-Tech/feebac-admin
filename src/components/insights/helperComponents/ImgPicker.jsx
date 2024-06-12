import { useState, useRef, useMemo } from "react";

//utils
import fileReader from "@/utils/fileReader";
import swal from "@/utils/swal";

//assets
import deleteIcon from "@/assets/delete.svg";
import uploadIcon from "@/assets/upload.png";
import { generateFileHash } from "@/utils/generateFileHash";

export default function ImgPicker({
  bg,
  page,
  setter,
  idx,
  hashArr,
  hashSetter,
}) {
  const imgRef = useRef(null);

  const [preview, setPreview] = useState(page);

  const background = useMemo(() => {
    switch (typeof bg) {
      case "string":
        return `url(${bg})`;

      case "object":
        if (bg instanceof File) return `url(${URL.createObjectURL(bg)})`;
        break;

      default:
        return "none";
    }
  }, [bg]);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const preview = await fileReader(file);
        const hash = await generateFileHash(file);

        if (hashArr.length > 0 && hashArr.includes(hash)) {
          throw new Error("Duplicate file detected");
        }

        setPreview(preview);
        hashSetter((prev) => [...prev, hash]);
        setter((prev) => {
          const getter = structuredClone(prev);
          getter.pages[idx].element = file;
          return getter;
        });
      } catch (error) {
        swal("error", error.message);
      }
    }
  };

  const handleDelete = () => {
    hashSetter((prev) => prev.filter((_, index) => index !== idx));

    setter((prev) => {
      const deletedPage = prev.pages[idx].element;
      const updatedRemovePage = prev.remove_page
        ? [...prev.remove_page, deletedPage]
        : [deletedPage];

      return {
        ...prev,
        pages: prev.pages.filter((_, index) => index !== idx),
        remove_page: updatedRemovePage,
      };
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="flex h-80 w-40 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#00000080] bg-white px-3 text-center text-sm"
        style={{ backgroundImage: background, backgroundSize: "cover" }}
      >
        <img src={preview} />
      </div>
      <div className="cursor-pointer">
        <span
          className="flex items-center gap-2 hover:underline"
          onClick={() => imgRef.current.click()}
        >
          <img src={uploadIcon} className="w-4" />
          <span>{`${preview ? "Change" : "Browse"} file`}</span>
        </span>
        <span
          className="flex items-center gap-2 hover:underline"
          onClick={handleDelete}
        >
          <img src={deleteIcon} className="w-4" />
          <span>Delete Page</span>
        </span>
        <input
          onChange={(e) => handleChange(e)}
          ref={imgRef}
          type="file"
          accept="image/*"
          name="pages"
          hidden
        />
      </div>
    </div>
  );
}
