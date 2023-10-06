import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Trow from "../table/Trow";
import Thead from "../table/Thead";
import Tdata from "../table/Tdata";

const HEADERS = ["User ID", "Gender", "Loyalty Points", "Location", "Actions"];

export default function User() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function getUserData() {
            try {
                const response = await makeRequest(
                    "site-admin/get-all-user?page=1&count=1000"
                );

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getUserData();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"User Information"} />
            <div className="h-[70vh] overflow-y-scroll bg-white">
                <Table>
                    <Thead headers={HEADERS} />
                    <tbody>
                        {userData.map(
                            ({
                                user_id,
                                gender,
                                loyalty_points,
                                state,
                                city,
                            }) => (
                                <Trow key={user_id}>
                                    <Tdata mono>
                                        {user_id.split("-").pop()}
                                    </Tdata>
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
                                        <div className="flex justify-center">
                                            <div class="tool-tip-div group">
                                                <Link to={user_id}>
                                                    <i className="text-xl fa-solid fa-circle-info"></i>
                                                </Link>
                                                <span class="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                    See User Info
                                                </span>
                                            </div>
                                        </div>
                                    </Tdata>
                                </Trow>
                            )
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
