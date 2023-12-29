export default function MenuButton({ name, handler, loading }) {
  return (
    <button
      className="cursor-pointer px-5 py-4 text-left transition hover:bg-light-grey disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handler}
      disabled={loading}
    >
      {name}
    </button>
  );
}
