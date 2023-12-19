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
        className="rounded-lg px-4 py-2 w-full border border-[#A6ACBE] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white"
      />
    </label>
  );
}
