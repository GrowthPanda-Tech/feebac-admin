export default function LayoutInput({
    name,
    label,
    type = "text",
    handleChange,
}) {
    return (
        <label className="flex gap-4 flex-col">
            <span className="capitalize font-semibold">
                {label ? label : name}
            </span>
            <input
                type={type}
                name={name}
                onChange={handleChange}
                className="bg-[#EFEFEF] rounded-md py-6 px-4"
            />
        </label>
    );
}
