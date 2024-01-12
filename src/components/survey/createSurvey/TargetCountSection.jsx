export default function TargetCountSection({ count }) {
  const { total, target } = count;
  return (
    <section className="flex gap-10 font-medium">
      <div className="flex gap-3">
        <span className="text-xl">Total Registered Users: </span>
        <span className="rounded-md bg-white px-6 py-1">{total}</span>
      </div>

      <div className="flex gap-3">
        <span className="text-xl">Target Group: </span>
        <span className="rounded-md bg-secondary px-6 py-1 text-white">
          {target}
        </span>
      </div>
    </section>
  );
}
