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
        className="w-full appearance-none rounded-lg border border-[#A6ACBE] bg-white px-4 py-2 capitalize disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled selected>
          Select Gender
        </option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </label>
  );
}
