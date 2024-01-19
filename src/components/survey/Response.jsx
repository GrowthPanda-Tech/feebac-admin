export default function Response({ index, question }) {
  const { question_title, options, question_type } = question || {};
  const { type_name } = question_type || {};

  const questionType = (qtype) => {
    switch (qtype) {
      case "radio":
        return "Single-Choice";

      case "checkbox":
        return "Multi-Choice";

      case "text":
        return "Text";

      default:
        throw new Error("Invalid question type!!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="font-semibold text-secondary">
        Question {index + 1} ({questionType(type_name)})
      </div>
      <div className="overflow-hidden rounded-xl">
        <div className="flex h-80 flex-col gap-8 overflow-auto bg-white p-8 shadow-md">
          <div className="text-lg font-semibold leading-snug">
            {question_title}
          </div>
          <div className="flex flex-col gap-5">
            {options?.map((option, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-semibold">{option[1]}</span>

                {/* Progress bar */}
                <div className="flex w-full items-center justify-between">
                  <div className="relative w-5/6">
                    <div
                      className="absolute left-0 top-0 z-10 h-2 rounded-full bg-secondary"
                      style={{
                        width: `${option[2] ? Math.floor(option[2][1]) : 0}%`,
                      }}
                    />
                    <div className="relative z-0 h-2 w-full rounded-full bg-[#E5E5E5]" />
                  </div>

                  <span className="w-1/6 text-center">
                    {option[2] ? `${option[2][1].toFixed(0)}` : 0}%
                  </span>
                </div>

                <div className="text-sm italic">
                  {option[2] && option[2][0] !== null ? (
                    <>
                      {option[2][0]} Response
                      {option[2][0] !== 1 ? "s" : ""}
                    </>
                  ) : (
                    "0 Responses"
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
