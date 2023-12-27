export default function BannerTypeSlider({ type, handleChange }) {
  return (
    <div className="flex rounded-[2.375rem] bg-white px-3 py-2">
      <button
        type="button"
        onClick={() => handleChange("image")}
        className={`${
          type === "image" && "bg-secondary text-white"
        } flex w-1/2 items-center justify-center gap-2 rounded-[2.375rem] px-7 py-1`}
      >
        Image
      </button>
      <button
        type="button"
        onClick={() => handleChange("video")}
        className={`${
          type === "video" && "bg-secondary text-white"
        } flex w-1/2 items-center justify-center gap-2 rounded-[2.375rem] px-7 py-1`}
      >
        Video
      </button>
    </div>
  );
}
