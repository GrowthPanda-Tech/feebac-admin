export default function TableData({ data, capitalize = false}) {
    return (
        <td 
            className=
            {`py-4 px-8 ${capitalize && 'capitalize'} first-of-type:text-start`}>
            {data}
        </td>
    );
}
