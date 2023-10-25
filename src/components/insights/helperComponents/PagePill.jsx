export default function PagePill({ index, active, onClick }) {
    return (
        <div
            className={`${
                active ? "bg-accent text-white" : "bg-white"
            } w-fit font-medium cursor-pointer py-2 px-7 rounded-2xl text-[#EA8552]`}
            onClick={onClick}
        >
            {index >= 0 ? `Page ${index + 1}` : "+"}
        </div>
    );
}
