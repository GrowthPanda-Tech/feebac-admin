import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableData from "../TableData";
import makeRequest from "../../utils/makeRequest";
import calculateAge from "../../utils/calculateAge";
import Table from "../table/Table";
import Thead from "../table/Thead";

function TableBody({ rowData }) {
    return (
        <tbody className="text-lg">
            {rowData.map((data, index) => {
                const link = (
                    <Link to={data.user_id}>
                        {data.user_id.split("-").pop()}
                    </Link>
                );
                return (
                    <tr key={index}>
                        <TableData data={link} mono />
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
                );
            })}
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
            <Table>
                <Thead headers={headers} />
                <TableBody rowData={userData} />
            </Table>
        </>
    );
}
