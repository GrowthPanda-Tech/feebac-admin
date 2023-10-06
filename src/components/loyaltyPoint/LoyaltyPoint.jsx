import React from "react";
import PageTitle from "../PageTitle";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import PieChart from "../dashboard/charts/PieChart";

const HEADERS = [
    "Transcation Id",
    "User ID",
    "Category",
    "Date",
    "Point history",
];

function LoyaltyPoint({ setLength }) {
    const [loyaltyData, setLoyaltyData] = useState([]);
    const [data, setData] = useState();
    const getData = async () => {
        const response = await makeRequest(
            `loyalty/get-loyalty-transaction`,
            "GET"
        );
        if (response.isSuccess) {
            setLoyaltyData(response.data);
            setData(response);
        }
    };

    const convertToLocal = (date) => {
        const dateObj = new Date(`${date} UTC`);
        return dateObj.toLocaleString();
    };

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

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        let ignore = false;

        async function fetchrRedeemData() {
            try {
                const response = await makeRequest(
                    `/loyalty/get-all-redeem-request?status=pending`
                );

                if (!response.isSuccess) {
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setLength(response.data.length);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchrRedeemData();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="w-full flex flex-col ">
            <div className="w-full flex justify-between gap-6">
                <div className="w-3/4 h-auto flex flex-col gap-6 ">
                    <div className="grid grid-cols-2 gap-8 w-full ">
                        <div className="bg-[#EA525F]  rounded-lg p-8 items-center  justify-center flex flex-col text-white">
                            <div className="flex flex-col text-center w-full">
                                <h2 className="text-5xl p-8">
                                    {data ? data.totalCredit : 0}
                                </h2>
                            </div>
                            <div className="flex justify-between mx-auto text-center">
                                <h3 className="text-3xl">Total Gain</h3>
                            </div>
                        </div>
                        <div className="bg-[#EA525F]  p-8 rounded-lg items-center justify-center flex flex-col  text-white">
                            <div className="flex flex-col text-center w-full">
                                <h2 className="text-5xl p-8">
                                    {data ? data.totalSpend : 0}
                                </h2>
                            </div>
                            <div className="flex justify-between mx-auto text-center">
                                <h3 className="text-3xl">Total Spend</h3>
                            </div>
                        </div>
                    </div>
                    <div className=" h-[40vh]  overflow-y-scroll bg-white ">
                        <Table>
                            <Thead headers={HEADERS} />
                            <tbody className="">
                                {loyaltyData.map(
                                    ({
                                        id,
                                        affectedUser,
                                        reason,
                                        value,
                                        dateTime,
                                        isCredit,
                                    }) => (
                                        <Trow key={id}>
                                            <Tdata mono>
                                                {id.split("-").pop()}
                                            </Tdata>
                                            <Tdata mono>
                                                {affectedUser.split("-").pop()}
                                            </Tdata>
                                            <Tdata>
                                                {reason ? reason : "-"}
                                            </Tdata>
                                            <Tdata>
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        {
                                                            convertToLocal(
                                                                dateTime
                                                            ).split(",")[0]
                                                        }
                                                    </div>
                                                    <div className="text-sm">
                                                        {
                                                            convertToLocal(
                                                                dateTime
                                                            ).split(",")[1]
                                                        }
                                                    </div>
                                                </div>
                                            </Tdata>
                                            <Tdata>
                                                {isCredit ? (
                                                    <span className="text-green">
                                                        + {value}
                                                    </span>
                                                ) : (
                                                    <span className=" text-[#FF0000]">
                                                        - {value}
                                                    </span>
                                                )}
                                            </Tdata>
                                        </Trow>
                                    )
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="w-1/4 flex flex-col items-center  rounded-lg p-8 h-fit  bg-white">
                    <h2 className=" text-2xl font-semibold ">
                        Points Statisticts
                    </h2>
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
