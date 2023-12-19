export default function Select({
  label,
  name,
  value,
  options,
  disabled,
  handleChange,
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-semibold">{label}</span>
      <select
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className="capitalize rounded-lg appearance-none bg-white px-4 py-2 w-full border border-[#A6ACBE] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </label>
  );
}
