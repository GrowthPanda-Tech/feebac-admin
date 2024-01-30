import clsx from "clsx";

export default function Button({
  type = "button",
  loading,
  handler,
  action,
  loadText,
  secondary,
}) {
  const style = clsx(
    "flex",
    "w-fit",
    "rounded-xl",
    secondary
      ? "bg-white border border-secondary text-secondary"
      : "bg-secondary text-white",
    "px-8",
    "py-3",
    "font-semibold",
    "capitalize",
    "transition",
    "disabled:border-none",
    "disabled:cursor-not-allowed",
    "disabled:bg-light-grey",
    "disabled:text-dark-grey",
  );

  return (
    <button type={type} className={style} onClick={handler} disabled={loading}>
      {loading ? (loadText ? `${loadText}...` : `${action}`) : `${action}`}
    </button>
  );
}
