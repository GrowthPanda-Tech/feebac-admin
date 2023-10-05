import { React, useState, useEffect } from "react";
import PieChart from "./charts/PieChart";
import makeRequest from "../../utils/makeRequest";
import AlertComponent from "../AlertComponent/AlertComponent";
import InfoCards from "./InfoCards";

function Dashboard() {
    const [adminData, setAdminData] = useState({});
    let surveyData = {
        labels: ["Total Survey", "Public Survey"],
        datasets: [
            {
                label: "Surveys",
                data: Object.values(
                    adminData.surveyData ? adminData.surveyData : []
                ),
                backgroundColor: [
                    "rgba(164, 57, 72, 1)",
                    "rgba(234, 82, 95, 1)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    let loyaltyData = {
        labels: ["Total Loyalty Point", "Used Loyalty Point"],
        datasets: [
            {
                label: "Loyalty Point",
                data: Object.values(
                    adminData.loyaltyPointData ? adminData.loyaltyPointData : []
                ),
                backgroundColor: [
                    "rgba(164, 57, 72, 1)",
                    "rgba(234, 82, 95, 1)",
                ],
                hoverOffset: 4,
            },
        ],
    };
    let articleData = {
        labels: ["Total Articles", "Public Articles"],
        datasets: [
            {
                label: "Articles",
                data: Object.values(
                    adminData?.articleData ? adminData?.articleData : []
                ),
                backgroundColor: [
                    "rgba(164, 57, 72, 1)",
                    "rgba(234, 82, 95, 1)",
                ],
                hoverOffset: 4,
            },
        ],
    };
    let newsData = {
        labels: ["Total Articles", "Public Articles"],
        datasets: [
            {
                label: "News",
                data: Object.values(
                    adminData?.articleData ? adminData?.articleData : []
                ),
                backgroundColor: [
                    "rgba(164, 57, 72, 1)",
                    "rgba(234, 82, 95, 1)",
                ],
                hoverOffset: 4,
            },
        ],
    };
    let option = {
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
        },
    };

    const getAdminData = async () => {
        const response = await makeRequest(
            "/site-admin/admin-dashboard",
            "GET"
        );
        response.isSuccess
            ? setAdminData(response.data)
            : AlertComponent("error", response.message);
    };

    useEffect(() => {
        getAdminData();
    }, []);

    console.log(Object.values(adminData));

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className=" flex w-full">
                <InfoCards
                    title={"Total User"}
                    value={adminData ? adminData?.totalUsers : ""}
                />
                <InfoCards title={"Active User"} value={5} />
                <InfoCards
                    title={"Total Android Download"}
                    value={
                        adminData
                            ? adminData?.downloadData?.totalAndroidDownloads
                            : ""
                    }
                />
                <InfoCards
                    title={"Total Ios Download"}
                    value={
                        adminData
                            ? adminData?.downloadData?.totalIOSDownloads
                            : ""
                    }
                />
            </div>

            <div>
                {/* <h2 className="text-3xl font-semibold mb-2">Statistics</h2> */}
                <div className="grid grid-cols-3 p-6 bg-white mt-5 rounded-lg">
                    {adminData && (
                        <PieChart chartData={surveyData} option={option} />
                    )}
                    {adminData && (
                        <PieChart chartData={loyaltyData} option={option} />
                    )}
                    {adminData && (
                        <PieChart chartData={articleData} option={option} />
                    )}
                </div>
            </div>
            {/* {adminData && (
                <div className="grid grid-cols-2 h-96">
                    <div className="flex w-full justify-between">
                        <div className="h-32 bg-white w-1/2 m-2 p-5">
                            <h2 className="text-2xl font-bold">
                                Total User:{adminData?.totalUsers}
                            </h2>
                        </div>
                        <div className="h-44 bg-white m-2 w-1/2 p-5">
                            <h2 className="text-xl flex flex-col font-bold">
                                Total Downloads
                                <span>
                                    Total Andriod Download :
                                    {
                                        adminData?.downloadData
                                            ?.totalAndroidDownloads
                                    }
                                </span>
                                <span>
                                    Total Ios Download :
                                    {adminData?.downloadData?.totalIOSDownloads}
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default Dashboard;
