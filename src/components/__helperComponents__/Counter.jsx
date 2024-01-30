export default function Counter({ count, max }) {
  return (
    <div className="flex gap-1 font-semibold text-dark-grey">
      <span className={`${count >= max ? `font-bold text-red-500` : ""}`}>
        {count}
      </span>
      /<span>{max}</span>
    </div>
  );
}
