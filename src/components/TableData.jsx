export default function TableData({ data, capitalize = false }) {
    const textCapitalize = capitalize ? 'capitalize' : 'normal-case';

    return (
        <td className={`p-6 ${textCapitalize}`}>{data}</td>
    );
}
