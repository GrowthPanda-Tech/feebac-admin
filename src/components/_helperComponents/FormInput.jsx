export default function FormInput({
    label,
    name,
    type = "text",
    handleChange,
}) {
    return (
        <label className="flex flex-col gap-4 w-full">
            <span className="font-semibold text-lg capitalize">
                {label ? label : name}
            </span>
            <input
                className="py-5 px-10 rounded-xl bg-white"
                type={type}
                name={name}
                onChange={handleChange}
            />
        </label>
    );
}
