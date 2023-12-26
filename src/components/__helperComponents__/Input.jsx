export default function Input({
  label,
  ref,
  name,
  value,
  type = "text",
  disabled = false,
  handleChange,
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-semibold">{label}</span>
      <input
        ref={ref}
        name={name}
        value={value}
        type={type}
        disabled={disabled}
        onChange={handleChange}
        className="w-full rounded-lg border border-[#A6ACBE] px-4 py-2 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
      />
    </label>
  );
}
