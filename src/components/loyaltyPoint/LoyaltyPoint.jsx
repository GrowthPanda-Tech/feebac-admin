import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

import Table from "../__helperComponents__/table/Table";
import Thead from "../__helperComponents__/table/Thead";
import Trow from "../__helperComponents__/table/Trow";
import Tdata from "../__helperComponents__/table/Tdata";
import TableDateTime from "../__helperComponents__/table/TableDateTime";
import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

import PieChart from "../dashboard/charts/PieChart";
import FilterLoyalty from "./FilterLoyalty";

const HEADERS = [
  "Transcation Id",
  "User ID",
  "Reason",
  "Date",
  "Point history",
];

function LoyaltyPoint() {
  const [loyaltyData, setLoyaltyData] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [selectedSort, setSelectedSort] = useState("");
  const [selectedReason, setSelectedReason] = useState("All");
  const [selectedPointsHistory, setSelectedPointsHistory] = useState("All");

  const sortedData = [...loyaltyData];

  useEffect(() => {
    if (selectedSort === "") {
      setSelectedReason("All");
      setSelectedPointsHistory("All");
    } else if (selectedSort === "By Points History") {
      setSelectedReason("All");
      sortedData.sort((a, b) => a.isCredit - b.isCredit);
    } else if (selectedSort === "By Reason") {
      setSelectedPointsHistory("All");
    }
  }, [selectedSort]);

  const filteredData = sortedData.filter(({ reason, isCredit }) => {
    const isCreditMatch =
      selectedPointsHistory === "All" ||
      (selectedPointsHistory === "Gain" && isCredit) ||
      (selectedPointsHistory === "Spend" && !isCredit);

    if (selectedReason === "All" && isCreditMatch) {
      return true;
    } else {
      return reason.type === selectedReason && isCreditMatch;
    }
  });

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setLoading(true);
        const response = await makeRequest(`loyalty/get-loyalty-transaction`);

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setLoyaltyData(response.data);
          setData(response);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        if (error.message == 204) {
          setLoading(false);
          setLoyaltyData([]);
          setData();
        }
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  let option = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  let pointsData = {
    labels: [
      "1st Time Sign Up",
      "Refer a Friend",
      "Completing Profile",
      "Survey Participation",
      "Read Article",
      "App Share",
    ],
    datasets: [
      {
        label: "",
        data: [40, 10, 33, 27, 22, 90],
        backgroundColor: [
          "rgba(220, 15, 89, 1)",
          "rgba(255, 127, 63, 1)",
          "rgba(255, 100, 113, 1)",
          "rgba(234, 82, 95, 1)",
          "rgba(227, 73, 94, 1)",
          "rgba(255, 139, 73, 1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-between gap-6">
        <div className="w-3/4 h-auto flex flex-col gap-4 ">
          <div className="flex justify-between w-full gap-10">
            <div className="bg-[#EA525F] p-16 w-[80%]  rounded-lg items-center  justify-center flex flex-col text-white">
              <h2 className="text-5xl">{data ? data.totalCredit : 0}</h2>
              <h3 className="text-3xl">Total Gain</h3>
            </div>
            <div className="bg-[#EA525F] rounded-lg w-[80%] items-center justify-center flex flex-col  text-white">
              <h2 className="text-5xl ">{data ? data.totalSpend : 0}</h2>
              <h3 className="text-3xl">Total Spend</h3>
            </div>
          </div>
          <FilterLoyalty
            setSelectedSort={setSelectedSort}
            selectedSort={selectedSort}
            setSelectedReason={setSelectedReason}
            setSelectedPointsHistory={setSelectedPointsHistory}
            selectedReason={selectedReason}
            selectedPointsHistory={selectedPointsHistory}
          />

          <div className=" h-[40vh]  overflow-y-scroll bg-white ">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Table>
                <Thead headers={HEADERS} />
                <tbody className="">
                  {filteredData.map(
                    ({
                      id,
                      affectedUser,
                      reason,
                      value,
                      dateTime,
                      isCredit,
                    }) => (
                      <Trow key={id}>
                        <Tdata mono>{id.split("-").pop()}</Tdata>
                        <Tdata mono>{affectedUser.split("-").pop()}</Tdata>
                        <Tdata>{reason.type}</Tdata>
                        <Tdata mono>
                          <div className="flex flex-col gap-2">
                            <TableDateTime date={dateTime} />
                          </div>
                        </Tdata>
                        <Tdata>
                          {isCredit ? (
                            <span className="text-green">+ {value}</span>
                          ) : (
                            <span className=" text-[#FF0000]">- {value}</span>
                          )}
                        </Tdata>
                      </Trow>
                    )
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-center  rounded-lg p-8 h-fit  bg-white">
          <h2 className=" text-2xl font-semibold ">Points Statisticts</h2>
          <PieChart
            chartData={pointsData}
            option={option}
            location={"loayalty"}
          />
        </div>
      </div>
    </div>
  );
}

export default LoyaltyPoint;
