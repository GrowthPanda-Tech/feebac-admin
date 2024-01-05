import { useState, useRef, useMemo } from "react";

//utils
import fileReader from "@/utils/fileReader";

//assets
import uploadArrow from "@/assets/upload.png";
import deleteIcon from "@/assets/delete.svg";

export default function ImgPicker({ bg, page, setter, idx }) {
  const imgRef = useRef(null);

  const [preview, setPreview] = useState(page);

  const background = useMemo(() => {
    if (typeof bg === "string") {
      return `url(${bg})`;
    }

    if (bg instanceof File) {
      return `url(${URL.createObjectURL(bg)})`;
    }

    return "none";
  }, [bg]);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const preview = await fileReader(file);

        setPreview(preview);

        setter((prev) => {
          const getter = { ...prev };
          getter.pages[idx].element = file;
          return getter;
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = () => {
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
    <div
      className={`relative flex h-80 w-40 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#00000080] bg-white px-3 text-center text-sm`}
      style={{ backgroundImage: background, backgroundSize: "cover" }}
    >
      {preview ? (
        <img src={preview} />
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
