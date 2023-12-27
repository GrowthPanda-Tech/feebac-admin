export default function AccentInput({
  label,
  name,
  type = "text",
  pattern,
  placeholder,
  ref,
  value,
  disabled = false,
  handleChange,
  required = false,
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-semibold capitalize">{label ? label : name}</span>
      <input
        name={name}
        type={type}
        pattern={pattern}
        placeholder={placeholder}
        ref={ref}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        required={required}
        className="rounded-xl border-2 border-[#EA8552] px-8 py-3"
      />
    </label>
  );
}
