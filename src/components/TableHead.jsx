export default function TableHead({headers}) {
    return (
        <thead className="text-xl">
            <tr>
                {
                    headers.map((header, index) => (
                        <th key={index} className="px-8 py-12 first-of-type:text-start"> {header} </th>
                    ))
                }
            </tr>
        </thead>
    );
}
