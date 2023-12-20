export default function PrimaryButton({ children, name, handleClick }) {
  return (
    <button
      className="py-3 px-8 bg-secondary hover:bg-primary transition text-white text-lg font-semibold flex items-center gap-2 rounded-md"
      onClick={handleClick}
    >
      {children}
      {name}
    </button>
  );
}
