import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Trow from "../table/Trow";
import Thead from "../table/Thead";
import Tdata from "../table/Tdata";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const HEADERS = ["User ID", "Gender", "Loyalty Points", "Location", "Actions"];

export default function User() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const request = {
            headers: {
                authToken: localStorage.getItem("authToken"),
            },
            signal,
        };

        async function getUserData() {
            try {
                const response = await fetch(
                    `${BASE_URL}/site-admin/get-all-user`,
                    request
                );

                if (response.status >= 500) {
                    throw new Error(response.status);
                }

                const json = await response.json();

                if (!json.isSuccess) {
                    throw new Error(json.message);
                }

                setUserData(json.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();

        return () => {
            controller.abort();
        };
    }, []);

    console.log(userData);

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"User Information"} />
            <Table>
                <Thead headers={HEADERS} />
                <tbody>
                    {userData.map(
                        ({ user_id, gender, loyalty_points, state, city }) => (
                            <Trow key={user_id}>
                                <Tdata mono>{user_id.split("-").pop()}</Tdata>
                                <Tdata capitalize>
                                    {gender ? gender : "-"}
                                </Tdata>
                                <Tdata>{loyalty_points} </Tdata>
                                <Tdata>
                                    {state && city
                                        ? `${city}, ${state}`
                                        : state
                                        ? state
                                        : "-"}
                                </Tdata>
                                <Tdata>
                                    <Link to={user_id}>
                                        <i className="text-xl fa-solid fa-circle-info"></i>
                                    </Link>
                                </Tdata>
                            </Trow>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}
