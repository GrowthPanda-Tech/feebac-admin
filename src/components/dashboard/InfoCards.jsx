export default function InfoCards({ title, value }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="relative w-full rounded-lg bg-white text-black">
        <div className="flex h-56 flex-col items-center justify-evenly p-10 text-center ">
          <h1 className="text-xl font-semibold">{title}</h1>
          <h1 className="text-5xl font-semibold text-[#EA8552]">{value}</h1>
        </div>
        <div className="absolute bottom-[-1rem]">
          <svg
            className="waves rounded-b-lg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(234, 82, 95, 1)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
