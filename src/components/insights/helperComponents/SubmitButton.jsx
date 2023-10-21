export default function SubmitButton({ insight, handleSubmit }) {
    return (
        <button
            className="w-fit py-3 px-7 transition bg-[#EA525F] hover:bg-[#EA8552] text-white font-semibold rounded-xl"
            type="submit"
            onClick={handleSubmit}
        >
            Create {!insight ? "Page" : ""}
        </button>
    );
}
