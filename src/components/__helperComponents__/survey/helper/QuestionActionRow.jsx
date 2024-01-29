//utils
import { initWithUUID } from "@/utils/initWithUUID";

//assets
import add_options from "@/assets/add.svg";

export default function QuestionActionRow(props) {
  const { setOptionState, setPop, loading } = props;

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

      <div className="flex gap-4">
        {setPop ? (
          <button
            type="button"
            className="btn-secondary disabled:cursor-not-allowed"
            disabled={loading}
            onClick={() => setPop((prev) => !prev)}
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="btn-primary disabled:btn-secondary disabled:cursor-not-allowed"
          disabled={loading}
        >
          <span>{loading ? "Saving..." : "Save"}</span>
        </button>
      </div>
    </div>
  );
}
