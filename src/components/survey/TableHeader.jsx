export default function TableHeader({ columns }) {
    return (
        <thead className="text-xl">
            <tr>
                {
                    columns.map((column, index) => (
                        <th key={index} className="p-6">{column}</th>
                    ))
                }
            </tr>
        </thead>
    );
}

