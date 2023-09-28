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

function LoyaltyPoint() {
    const [loyaltyData, setLoyaltyData] = useState([]);
    const [data, setData] = useState();
    const getData = async () => {
        const response = await makeRequest(
            `loyalty/get-user-loyalty-record`,
            "GET"
        );
        if (response.isSuccess) {
            setLoyaltyData(response.data);
            setData(response);
        }
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
    console.log(data);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="w-full flex flex-col ">
            <div className="grid grid-cols-2 gap-8 w-full">
                <div className="bg-[#EA525F] mt-6 rounded-lg p-8 items-center w-full justify-center flex flex-col text-white">
                    <div className="flex flex-col text-center w-full">
                        <h2 className="text-5xl p-8">
                            {data ? data.totalCredit : ""}
                        </h2>
                    </div>
                    <div className="flex justify-between mx-auto text-center">
                        <h3 className="text-3xl">Total Gain</h3>
                    </div>
                </div>
                <div className="bg-[#EA525F] mt-6 p-8 rounded-lg items-center w-full justify-center flex flex-col  text-white">
                    <div className="flex flex-col text-center w-full">
                        <h2 className="text-5xl p-8">
                            {data ? data.totalSpend : ""}
                        </h2>
                    </div>
                    <div className="flex justify-between mx-auto text-center">
                        <h3 className="text-3xl">Total Spend</h3>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between gap-2">
                <div className="w-3/4 mt-10 h-auto no-scrollbar overflow-y-scroll">
                    <Table>
                        <Thead headers={HEADERS} />
                        <tbody>
                            {loyaltyData &&
                                loyaltyData.map(
                                    ({
                                        id,
                                        affectedUser,
                                        reason,
                                        value,
                                        dateTime,
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
                                            <Tdata>{dateTime.trim(" ")}</Tdata>
                                            <Tdata>{value}</Tdata>
                                        </Trow>
                                    )
                                )}
                        </tbody>
                    </Table>
                </div>
                <div className="w-1/4 flex flex-col items-center p-4 mt-10 bg-white">
                    <h2 className=" text-2xl font-semibold ">
                        Points Statisticts
                    </h2>
                    <div>
                        <PieChart chartData={pointsData} option={option} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoyaltyPoint;
