import useStateEffect from '../../hooks/useStateEffect';
import TableHead from '../TableHead';
import TableData from '../TableData';

//TODO: should i export this to utils?
function calculateAge(date) {
    const birthDate = new Date(date);
    const currentDate = new Date();

    let roundedAge;

    const ageInMiliSec = currentDate - birthDate;
    const ageInYears = ageInMiliSec / (365 * 24 * 60 * 60 * 1000);
    const floorValue = Math.floor(ageInYears);

    floorValue === 0 ? roundedAge = '-' : roundedAge = floorValue;

    return roundedAge;
}

function TableBody({rowData}) {
    return (
        <tbody className="text-lg">
            {
                rowData.map((data, index) => (
                    <tr key={index}>
                        <TableData data={index + 1} />
                        <TableData data={data.user_id.split('-').pop()} />
                        <TableData data={data.gender === null ? '-' : data.gender} />
                        <TableData data={data.date_of_birth === null ? '-' : calculateAge(data.date_of_birth)} />
                        <TableData data={data.loyalty_points} />
                        <TableData data={data.state === null ? '-' : data.state} />
                    </tr>
                ))
            }
        </tbody>
    );
}

export default function User() {
    const userList = useStateEffect('array', 'site-admin/get-all-user', 'GET');
    const headers = ["No.", "User ID", "Gender", "Age", "Loyalty Points", "Location"];

    return (
        <>
            <h1 className="heading"> User Information </h1>
            <table className="table-fixed w-full bg-white rounded-xl text-center">
                <TableHead headers={headers} />
                <TableBody rowData={userList} />
            </table>
        </>
    );
}
