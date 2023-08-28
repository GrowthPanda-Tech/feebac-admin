import { useState, useEffect } from "react";
import TableData from "../TableData";
import makeRequest from "../../utils/makeRequest";

function TableBody({ rowData }) {
    const calculateAge = (date) => {
        const birthDate = new Date(date);
        const currentDate = new Date();

        let roundedAge;

        const ageInMiliSec = currentDate - birthDate;
        const ageInYears = ageInMiliSec / (365 * 24 * 60 * 60 * 1000);
        const floorValue = Math.floor(ageInYears);

        floorValue === 0 ? (roundedAge = "-") : (roundedAge = floorValue);

        return roundedAge;
    };

    return (
        <tbody className="text-lg">
            {rowData.map((data, index) => (
                <tr key={index}>
                    <TableData
                        data={data.user_id.split("-").pop()}
                        mono={true}
                    />
                    <TableData data={data.gender ? data.gender : "-"} />
                    <TableData
                        data={
                            data.date_of_birth
                                ? calculateAge(data.date_of_birth)
                                : "-"
                        }
                    />
                    <TableData data={data.loyalty_points} />
                    <TableData data={data.state ? data.state : "-"} />
                </tr>
            ))}
        </tbody>
    );
}

export default function User() {
    const headers = ["User ID", "Gender", "Age", "Loyalty Points", "Location"];

    const [userData, setUserData] = useState([]);

    const getUserData = async () => {
        const response = await makeRequest("site-admin/get-all-user", "GET");
        response.isSuccess
            ? setUserData(response.data)
            : alert(response.message);
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <h1 className="heading"> User Information </h1>
            <table className="table-fixed w-full bg-white rounded-xl text-center">
                <thead className="text-xl">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-4 py-8">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <TableBody rowData={userData} />
            </table>
        </>
    );
}
