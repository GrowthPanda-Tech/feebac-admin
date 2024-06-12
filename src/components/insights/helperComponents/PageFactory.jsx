import AddPage from "./AddPage";
import ImgPicker from "./ImgPicker";

export default function PageFactory({ data, setter, hashArr, hashSetter }) {
  const { image, pages } = data;

  return (
    <div className="flex flex-wrap gap-8">
      {pages.map(({ element: page, uuid }, idx) => (
        <div className="flex flex-col gap-3" key={uuid}>
          <span className="font-medium leading-snug text-accent">
            {`Page ${idx + 1}`}
          </span>

          <ImgPicker
            bg={image}
            page={page}
            setter={setter}
            idx={idx}
            hashArr={hashArr}
            hashSetter={hashSetter}
          />
        </div>
      ))}

      <AddPage pageCount={pages.length + 1} setter={setter} />
    </div>
  );
}
