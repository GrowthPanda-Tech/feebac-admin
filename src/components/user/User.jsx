import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../__helperComponents__/PageTitle";
import Table from "../__helperComponents__/table/Table";
import Trow from "../__helperComponents__/table/Trow";
import Thead from "../__helperComponents__/table/Thead";
import Tdata from "../__helperComponents__/table/Tdata";
import Pagination from "../__helperComponents__/Pagination";
import PaginationSelect from "../__helperComponents__/PaginationSelect";
import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

const HEADERS = ["User ID", "Gender", "Loyalty Points", "Location", "Actions"];

export default function User() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    let ignore = false;

    async function getUserData() {
      try {
        setLoading(true);
        const response = await makeRequest(
          `site-admin/get-all-user?page=${page}&count=${itemsPerPage}`
        );

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setUserData(response.data);
          setTotalItems(response.totalCount);
          setLoading(false);
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
      <div className="flex justify-between">
        <PageTitle name={"User Information"} />
        <div className="space-x-3">
          <PaginationSelect
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
      <div className="h-[69vh] overflow-y-scroll bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <Thead headers={HEADERS} />
            <tbody>
              {userData.map(
                ({ user_id, gender, loyalty_points, state, city }) => (
                  <Trow key={user_id}>
                    <Tdata mono>{user_id.split("-").pop()}</Tdata>
                    <Tdata capitalize>{gender ? gender : "-"}</Tdata>
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
                            <i className="fa-solid fa-circle-info text-xl"></i>
                          </Link>
                          <span className="tool-tip-span -right-[2.8rem] -top-12 bg-black ">
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
        )}
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
