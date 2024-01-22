import QuestionInput from "./QuestionInput";
import delete_options from "@/assets/delete.svg";

export default function QuestionOptions(props) {
  const { optionState, setOptionState } = props;

  return (
    <div className="flex flex-col gap-4">
      {optionState.map(({ element, uuid }, index) => (
        <div key={uuid} className="flex gap-8">
          <QuestionInput
            value={element}
            //TODO: dispatch actions
            setState={(event) =>
              setOptionState((prev) => {
                const { value } = event.target;
                const curr = [...prev];

                if (!curr[index]) return (curr[index] = value);

                curr[index].element = value;
                return curr;
              })
            }
          />

          {optionState.length > 2 && (
            <img
              src={delete_options}
              alt="Delete option"
              className="cursor-pointer"
              onClick={() =>
                setOptionState((prev) => prev.filter((_, i) => i !== index))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
