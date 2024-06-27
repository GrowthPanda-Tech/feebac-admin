import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import makeRequest from "../../utils/makeRequest";

import PageTitle from "../__helperComponents__/PageTitle";
import Table from "../__helperComponents__/table/Table";
import Thead from "../__helperComponents__/table/Thead";
import Trow from "../__helperComponents__/table/Trow";
import Tdata from "../__helperComponents__/table/Tdata";
import TableDateTime from "../__helperComponents__/table/TableDateTime";
import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

const HEADERS = [
  "Request Id",
  "Coupon Name",
  "User Id",
  "Request Date",
  "Status",
  "Actions",
];

const APPROVEDHEADERS = [
  "Request Id",
  "Coupon Name",
  "User Id",
  "Approved Date",
  "Status",
  "Approved By",
  "Actions",
];

function Button({ type, setStatus, isActive, onClick }) {
  const handleClick = () => {
    setStatus(type);
    onClick();
  };

  return (
    <button
      className={`capitalize ${isActive ? "pill-primary" : "pill-secondary"}`}
      onClick={handleClick}
    >
      {type}
    </button>
  );
}

function ButtonComponent({ setStatus }) {
  const [activeButton, setactiveButton] = useState(1);
  const handleClick = (buttonId) => setactiveButton(buttonId);

  return (
    <div className="flex gap-4">
      <Button
        type={"pending"}
        setStatus={setStatus}
        isActive={activeButton === 1}
        onClick={() => handleClick(1)}
      />
      <Button
        type={"approved"}
        setStatus={setStatus}
        isActive={activeButton === 2}
        onClick={() => handleClick(2)}
      />
    </div>
  );
}

export default function RedeemRequest() {
  const [redeemData, setRedeemData] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchRedeemData() {
      try {
        setLoading(true);

        const response = await makeRequest(
          `/loyalty/get-all-redeem-request?status=${status}`,
        );

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setRedeemData(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.message == 204) {
          setLoading(false);
          setRedeemData([]);
        }
      }
    }

    fetchRedeemData();

    return () => {
      ignore = true;
    };
  }, [status]);

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Request List"} />
      <ButtonComponent setStatus={setStatus} />

      <div className=" h-[50vh] overflow-y-scroll bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <Thead headers={status === "pending" ? HEADERS : APPROVEDHEADERS} />
            <tbody>
              {redeemData.map(
                ({
                  id,
                  title,
                  requestBy,
                  createdDate,
                  actionDate,
                  approvedBy,
                }) => (
                  <Trow key={id}>
                    <Tdata>{id.split("-").pop()} </Tdata>
                    <Tdata capitalize> {title} </Tdata>
                    <Tdata mono>{requestBy.split("-").pop()}</Tdata>
                    <Tdata mono>
                      <div className="flex flex-col gap-2">
                        <TableDateTime
                          date={status === "pending" ? createdDate : actionDate}
                        />
                      </div>
                    </Tdata>
                    <Tdata capitalize>
                      {status === "pending" ? (
                        <span className="chip-red">{status}</span>
                      ) : (
                        <span className="chip-green">{status}</span>
                      )}
                    </Tdata>

                    {status === "pending" ? (
                      <Tdata>
                        <div className="flex justify-center">
                          <div className="tool-tip-div group">
                            <div className="flex justify-center gap-4">
                              {status === "pending" ? (
                                <Link to={`redeem/${id}`}>
                                  <i className="fa-solid fa-circle-info text-xl"></i>
                                </Link>
                              ) : null}
                            </div>
                            <span className="tool-tip-span -right-[4.8rem] -top-12 bg-black ">
                              See Redeem Request
                            </span>
                          </div>
                        </div>
                      </Tdata>
                    ) : (
                      <Tdata capitalize>
                        <span className="px-2">
                          {approvedBy ? approvedBy.split("-").pop() : ""}
                        </span>
                      </Tdata>
                    )}
                    {status === "approved" ? (
                      <Tdata>
                        <div className="flex justify-center">
                          <div className="tool-tip-div group">
                            <Link to={`redeem/${id}`}>
                              <i className="fa-solid fa-circle-info text-xl"></i>
                            </Link>
                            <span className="tool-tip-span -right-[3.8rem] -top-12 bg-black ">
                              See Approved Info
                            </span>
                          </div>
                        </div>
                      </Tdata>
                    ) : (
                      ""
                    )}
                  </Trow>
                ),
              )}
            </tbody>
          </Table>
        )}
        {redeemData.length === 0 ? (
          <div className="flex items-center justify-center p-56 opacity-50">
            No {status} requests found !!
          </div>
        ) : null}
      </div>
    </div>
  );
}
