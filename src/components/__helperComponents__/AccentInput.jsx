import calculateLength from "@/utils/calculateLength";
import Counter from "./Counter";

export default function AccentInput({
  label,
  name,
  type = "text",
  pattern,
  placeholder,
  ref,
  value,
  disabled = false,
  count,
  handleChange,
  required = false,
}) {
  return (
    <label className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="font-semibold capitalize">{label ? label : name}</span>
        {count ? (
          <Counter count={calculateLength(count.type, value)} max={count.max} />
        ) : null}
      </div>
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
