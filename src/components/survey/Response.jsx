export default function Response({ index, question }) {
  const type =
    question.question_type === "radio" ? "Single-choice" : "Multi-choice";

  return (
    <div className="flex flex-col gap-4">
      <div className="font-semibold text-secondary">
        Question {index + 1} ({type})
      </div>
      <div className="h-full rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-lg font-semibold leading-snug">
          {question.question_title}
        </div>
        {question.options.map((option, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="mt-4 flex justify-between gap-2">
              <span className="font-semibold">
                {index + 1}. {option[1]}
              </span>
              <span>{option[2] ? `${option[2][1].toFixed(0)}%` : ""}</span>
            </div>

            {/* Progress bar */}
            <div
              className="h-2 rounded-full bg-secondary"
              style={{
                width: `${option[2] ? Math.floor(option[2][1]) : 0}%`,
              }}
            />

            {option[2] && option[2][0] > 0 && (
              <div className="text-sm italic">
                {option[2][0]} Response
                {option[2][0] != 1 ? "s" : ""}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
