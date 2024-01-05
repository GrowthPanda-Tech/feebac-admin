import { v4 as uuidv4 } from "uuid";

export default function AddPage({ pageCount, setter }) {
  const handlePageAdd = () => {
    const page = {
      element: null,
      uuid: uuidv4(),
    };

    setter((prev) => {
      const getter = { ...prev };
      getter.pages = [...prev.pages, page];
      return getter;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="font-medium leading-snug text-[#BABABA]">
        Page {pageCount}
      </span>

      <div className="flex h-80 w-40 items-center justify-center rounded-2xl border border-dashed border-[#00000080] bg-transparent">
        <span
          className="cursor-pointer select-none text-6xl text-[#BCBCBC]"
          onClick={handlePageAdd}
        >
          +
        </span>
      </div>
    </div>
  );
}
