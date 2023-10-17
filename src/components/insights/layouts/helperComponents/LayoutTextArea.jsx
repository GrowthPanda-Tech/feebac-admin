export default function LayoutTextArea({ name, label, type, handleChange }) {
    return (
        <label className="flex gap-4 flex-col">
            <span className="capitalize font-semibold">
                {label ? label : name}
            </span>
            <textarea
                type={type}
                name={name}
                onChange={handleChange}
                className="bg-[#EFEFEF] rounded-md p-4"
                rows={10}
            />
        </label>
    );
}
