import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Tdata from "../table/Tdata";

export default function User() {
    const headers = [
        "User ID",
        "Gender",
        "Loyalty Points",
        "Location",
        "Actions",
    ];

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
                <tbody className="text-lg">
                    {userData.map((data, index) => (
                        <tr
                            key={index}
                            className="border-b border-b-light-grey hover:bg-[#F8F8F8]"
                        >
                            <Tdata mono>{data.user_id.split("-").pop()}</Tdata>
                            <Tdata>{data.gender ? data.gender : "-"}</Tdata>
                            <Tdata>{data.loyalty_points} </Tdata>
                            <Tdata>{data.state ? data.state : "-"}</Tdata>
                            <Tdata>
                                <Link to={data.user_id}>
                                    <i className="fa-solid fa-circle-info text-2xl text-accent"></i>
                                </Link>
                            </Tdata>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
