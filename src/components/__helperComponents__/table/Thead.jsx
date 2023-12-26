export default function Thead({ headers }) {
  return (
    <thead className="sticky top-0 z-10 bg-white text-xl">
      <tr className="border-b border-b-light-grey">
        {headers.map((header, index) => (
          <th key={index} className="px-4 py-8">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
