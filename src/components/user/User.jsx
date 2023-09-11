import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Trow from "../table/Trow";
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
                <tbody>
                    {userData.map(
                        ({ user_id, gender, loyalty_points, state }) => (
                            <Trow key={user_id}>
                                <Tdata mono>{user_id.split("-").pop()}</Tdata>
                                <Tdata>{gender ? gender : "-"}</Tdata>
                                <Tdata>{loyalty_points} </Tdata>
                                <Tdata>{state ? state : "-"}</Tdata>
                                <Tdata>
                                    <Link to={user_id}>
                                        <i className="fa-solid fa-circle-info text-2xl text-accent"></i>
                                    </Link>
                                </Tdata>
                            </Trow>
                        )
                    )}
                </tbody>
            </Table>
        </>
    );
}
