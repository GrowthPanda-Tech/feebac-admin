export default function TableHead({headers}) {
    return (
        <thead className="text-xl">
            <tr>
                {
                    headers.map((header, index) => (
                        <th key={index} className="px-6 py-12"> {header} </th>
                    ))
                }
            </tr>
        </thead>
    );
}
