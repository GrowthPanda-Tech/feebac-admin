import clsx from "clsx";

//Add any types if needed
const QUESTION_TYPES = {
  2: "One Answer",
  3: "Multiple Answer",
};

export default function QuestionTypeSelector(props) {
  const { type, setQuestionState, disabled } = props;

  return (
    <div className="flex gap-8">
      {Object.entries(QUESTION_TYPES).map(([typeId, typeText]) => {
        const typeInt = parseInt(typeId); //object keys always get converted to strings
        return (
          <div
            key={typeInt}
            className={clsx("rounded-md px-10 py-2 font-medium transition", {
              "cursor-not-allowed": disabled,
              "cursor-pointer": !disabled,
              "bg-[#EA8552] text-white": type === typeInt,
              "bg-[#F3F3F3] text-[#797979]": type !== typeInt,
            })}
            onClick={() => {
              if (!disabled) {
                setQuestionState((prev) => ({
                  ...prev,
                  questionType: typeInt,
                }));
              }
            }}
          >
            {typeText}
          </div>
        );
      })}
    </div>
  );
}
