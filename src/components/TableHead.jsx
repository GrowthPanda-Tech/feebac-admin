export default function TableHead({ headers }) {
    return (
        <thead className="text-xl">
            <tr>
                {
                    headers.map((header, index) => (
                        <th key={index}
                            className="px-4 py-8 first-of-type:text-left">
                            {header}
                        </th>
                    ))
                }
            </tr>
        </thead>
    );
}
