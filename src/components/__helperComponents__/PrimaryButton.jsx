export default function PrimaryButton({ children, name, handleClick }) {
  return (
    <button
      className="flex items-center gap-2 rounded-md bg-secondary px-8 py-3 text-lg font-semibold text-white transition hover:bg-primary"
      onClick={handleClick}
    >
      {children}
      {name}
    </button>
  );
}
