import AddPage from "./AddPage";
import ImgPicker from "./ImgPicker";

export default function PageFactory({ data, setter }) {
  const { image, pages } = data;

  return (
    <div className="flex flex-wrap gap-8">
      {pages.map((page, idx) => (
        <div className="flex flex-col gap-3" key={idx}>
          <span className="font-medium leading-snug text-accent">
            Page {idx + 1}
          </span>

          <ImgPicker bg={image} page={page} setter={setter} idx={idx} />
        </div>
      ))}

      <AddPage pageCount={pages.length + 1} setter={setter} />
    </div>
  );
}
