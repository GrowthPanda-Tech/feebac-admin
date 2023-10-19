export default function LayoutSubmit({ handleSubmit }) {
    return (
        <button
            className="w-fit py-2 px-7 bg-[#EA525F] text-white font-semibold rounded-xl"
            onClick={handleSubmit}
        >
            Create Page
        </button>
    );
}
