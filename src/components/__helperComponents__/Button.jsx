export default function Button({
  loading,
  handler,
  action,
  loadText,
  secondary,
}) {
  return (
    <button
      className={`flex w-fit rounded-xl ${
        secondary ? `bg-accent` : `bg-secondary`
      } px-8 py-3 font-semibold capitalize text-white transition hover:bg-primary disabled:cursor-not-allowed`}
      onClick={handler}
      disabled={loading}
    >
      {loading ? `${loadText}...` : action}
    </button>
  );
}
