import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import PageTitle from "../PageTitle";
import makeRequest from "../../utils/makeRequest";

//assets
import LoadingSpinner from "../_helperComponents/LoadingSpinner";
import TableDateTime from "../table/TableDateTime";

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

    async function fetchrRedeemData() {
      try {
        setLoading(true);

        const response = await makeRequest(
          `/loyalty/get-all-redeem-request?status=${status}`
        );

        if (!response.isSuccess) {
          throw new Error(json.message);
        }

        if (!ignore) {
          setRedeemData(
            response.data.filter((item) => item.currentStatus === `${status}`)
          );
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (error.message == 204) {
          setLoading(false);
          setRedeemData([]);
        }
      }
    }

    fetchrRedeemData();

    return () => {
      ignore = true;
    };
  }, [status]);

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Request List"} />
      <ButtonComponent setStatus={setStatus} />

      <div className=" bg-white h-[50vh] overflow-y-scroll">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <Thead headers={status === "pending" ? HEADERS : APPROVEDHEADERS} />
            <tbody>
              {redeemData.map(
                ({
                  id,
                  coupon,
                  requestBy,
                  createdDate,
                  actionDate,
                  approvedBy,
                  currentStatus,
                }) => (
                  <Trow key={id}>
                    <Tdata>{id.split("-").pop()} </Tdata>
                    <Tdata capitalize> {coupon} </Tdata>
                    <Tdata mono>{requestBy.split("-").pop()}</Tdata>
                    <Tdata mono>
                      <div className="flex flex-col gap-2">
                        <TableDateTime
                          data={status === "pending" ? createdDate : actionDate}
                        />
                      </div>
                    </Tdata>
                    <Tdata capitalize>
                      {status === "pending" ? (
                        <span className="chip-red">{currentStatus}</span>
                      ) : (
                        <span className="chip-green">{currentStatus}</span>
                      )}
                    </Tdata>

                    {status === "pending" ? (
                      <Tdata>
                        <div className="flex justify-center">
                          <div className="tool-tip-div group">
                            <div className="flex justify-center gap-4">
                              {status === "pending" ? (
                                <Link to={`redeem/${id}`}>
                                  <i className="text-xl fa-solid fa-circle-info"></i>
                                </Link>
                              ) : null}
                            </div>
                            <span className="tool-tip-span -right-[4.8rem] bg-black -top-12 ">
                              See Redeem Request
                              <span className="tooltip-arrow bottom-[-2px] left-[45%]"></span>
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
                              <i className="text-xl fa-solid fa-circle-info"></i>
                            </Link>
                            <span className="tool-tip-span -right-[3.8rem] bg-black -top-12 ">
                              See Approved Info
                              <span className="tooltip-arrow bottom-[-2px] left-[47%]"></span>
                            </span>
                          </div>
                        </div>
                      </Tdata>
                    ) : (
                      ""
                    )}
                  </Trow>
                )
              )}
            </tbody>
          </Table>
        )}
        {redeemData.length === 0 ? (
          <div className="flex justify-center items-center p-56 opacity-50">
            Ops No {status} Request Found !!
          </div>
        ) : null}
      </div>
    </div>
  );
}
