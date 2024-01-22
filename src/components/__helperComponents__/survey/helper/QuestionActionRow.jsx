import { initWithUUID } from "@/utils/initWithUUID";
import add_options from "@/assets/add.svg";

export default function QuestionActionRow(props) {
  const { setOptionState, loading } = props;

  return (
    <div className="flex justify-between">
      <button
        type="button"
        className="flex gap-3 rounded-xl border border-black px-8 py-3 transition hover:bg-secondary hover:text-white"
        onClick={() =>
          setOptionState((prev) => [...prev, ...initWithUUID([""])])
        }
      >
        <img src={add_options} alt="Adds options" />
        <span className="font-medium">Add Options</span>
      </button>

      <button
        type="submit"
        className="btn-primary disabled:btn-secondary disabled:cursor-not-allowed"
        disabled={loading}
      >
        <span>{loading ? "Saving..." : "Save"}</span>
      </button>
    </div>
  );
}
