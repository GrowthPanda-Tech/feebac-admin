import QuestionInput from "./QuestionInput";

export default function QuestionTitle(props) {
  const { questionNumber, value, setState } = props;

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold">Question {questionNumber}</span>
      <QuestionInput
        name={"questionTitle"}
        value={value}
        setState={(event) =>
          setState((prev) => {
            const { name, value } = event.target;
            return { ...prev, [name]: value };
          })
        }
      />
    </div>
  );
}
