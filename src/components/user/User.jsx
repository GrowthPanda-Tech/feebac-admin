import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Trow from "../table/Trow";
import Thead from "../table/Thead";
import Tdata from "../table/Tdata";
import Pagination from "../Pagination";
import PaginationSelect from "../PaginationSelect";

const HEADERS = ["User ID", "Gender", "Loyalty Points", "Location", "Actions"];
export default function User() {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [userData, setUserData] = useState([]);
    const [totalItems, setTotalItems] = useState(1);

    useEffect(() => {
        let ignore = false;

        async function getUserData() {
            try {
                const response = await makeRequest(
                    `site-admin/get-all-user?page=${page}&count=${itemsPerPage}`
                );

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setUserData(response.data);
                    setTotalItems(response.totalCount);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getUserData();

        return () => {
            ignore = true;
        };
    }, [itemsPerPage, page]);

    return (
        <div className="flex flex-col gap-4">
            <div className=" flex justify-between">
                <PageTitle name={"User Information"} />
                <div className=" space-x-3">
                    <PaginationSelect
                        setItemsPerPage={setItemsPerPage}
                        setPage={setPage}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
            <div className="h-[64vh] overflow-y-scroll bg-white">
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
                                            <div className="tool-tip-div group">
                                                <Link to={user_id}>
                                                    <i className="text-xl fa-solid fa-circle-info"></i>
                                                </Link>
                                                <span className="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                    See User Info
                                                    <span className="tooltip-arrow bottom-[-2px] left-[41%]"></span>
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
            <Pagination
                page={page}
                setPage={setPage}
                setItemsPerPage={setItemsPerPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
            />
        </div>
    );
}
