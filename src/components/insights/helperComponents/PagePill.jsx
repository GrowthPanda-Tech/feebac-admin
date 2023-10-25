export default function PagePill({ index, onClick }) {
    return (
        <div
            className="bg-white w-fit font-medium cursor-pointer py-2 px-7 rounded-2xl text-[#EA8552]"
            onClick={onClick}
        >
            Page {index + 1}
        </div>
    );
}
