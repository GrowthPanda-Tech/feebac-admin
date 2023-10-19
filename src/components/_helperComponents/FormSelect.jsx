export default function FormSelect({ name, children, value, handleChange }) {
    return (
        <label className="flex flex-col gap-4 w-1/2">
            <span className="font-semibold text-lg capitalize"> {name} </span>
            <select
                className="capitalize bg-white border border-[#1D1D1D] py-5 px-10 rounded-xl appearance-none"
                name={name}
                value={value}
                onChange={handleChange}
            >
                {children}
            </select>
        </label>
    );
}
