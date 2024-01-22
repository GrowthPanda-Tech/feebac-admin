import add_options from "@/assets/add.svg";

export default function QuestionActionRow(props) {
  const { setOptionState } = props;

  return (
    <div className="flex justify-between">
      <button
        type="button"
        className="flex gap-3"
        onClick={() => setOptionState((prev) => [...prev, ""])}
      >
        <img src={add_options} alt="Adds options" />
        <span>Add Options</span>
      </button>

      <button type="button" className="">
        <span>Save</span>
      </button>
    </div>
  );
}
