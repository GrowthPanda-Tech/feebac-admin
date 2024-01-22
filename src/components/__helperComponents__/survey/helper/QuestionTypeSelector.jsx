//Add any types if needed
const QUESTION_TYPES = {
  2: "One Answer",
  3: "Multiple Answer",
};

export default function QuestionTypeSelector({ type, setType }) {
  return (
    <div className="flex gap-8">
      {Object.entries(QUESTION_TYPES).map(([typeId, typeText]) => (
        <div
          key={typeId}
          className={`cursor-pointer rounded-md px-10 py-2 font-medium transition ${
            type == typeId
              ? "bg-[#EA8552] text-white"
              : "bg-[#F3F3F3] text-[#797979]"
          }`}
          onClick={() =>
            setType((prev) => ({ ...prev, questionType: parseInt(typeId) }))
          }
        >
          {typeText}
        </div>
      ))}
    </div>
  );
}
