export default function SubmitButton({ insight, handleSubmit }) {
    return (
        <button
            className="w-fit py-2 px-7 bg-[#EA525F] text-white font-semibold rounded-xl"
            type="submit"
            onClick={handleSubmit}
        >
            Create {!insight ? "Page" : ""}
        </button>
    );
}
