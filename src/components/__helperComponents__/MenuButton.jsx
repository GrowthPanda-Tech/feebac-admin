export default function MenuButton({ name, handler }) {
  return (
    <button
      className="cursor-pointer px-5 py-4 text-left transition hover:bg-light-grey"
      onClick={handler}
    >
      {name}
    </button>
  );
}
