import { React, useState, useEffect } from "react";
import PieChart from "./charts/PieChart";
import makeRequest from "../../utils/makeRequest";
import AlertComponent from "../AlertComponent/AlertComponent";
import InfoCards from "./InfoCards";
import LoadingSpinner from "../_helperComponents/LoadingSpinner";
import DashboardSkeleton from "../_helperComponents/DashboardSkeleton";

function Dashboard() {
    const [adminData, setAdminData] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(adminData);

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

    useEffect(() => {
        let ignore = false;

        async function getAdminData() {
            try {
                const response = await makeRequest(
                    "/site-admin/admin-dashboard",
                    "GET"
                );

                if (!response.isSuccess) {
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setAdminData(response.data);
                    setLoading(false);
                }
            } catch (error) {
                AlertComponent("error", error.message);
                if (error.message == 204) {
                    setAdminData([]);
                    setLoading(false);
                }
            }
        }

        getAdminData();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            {adminData.length === 0 ? (
                <div className="flex h-[60vh] font-semibold text-2xl justify-center items-center">
                    Ops No Data to show
                </div>
            ) : !loading ? (
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="flex flex-col">
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
                                        ? adminData?.downloadData?.android
                                        : ""
                                }
                            />
                            <InfoCards
                                title={"Total Ios Download"}
                                value={
                                    adminData
                                        ? adminData?.downloadData?.iOS
                                        : ""
                                }
                            />
                        </div>

                        <div>
                            <div className="grid grid-cols-3 p-6 bg-white mt-5 rounded-lg">
                                {adminData && (
                                    <PieChart
                                        chartData={surveyData}
                                        option={option}
                                    />
                                )}
                                {adminData && (
                                    <PieChart
                                        chartData={loyaltyData}
                                        option={option}
                                    />
                                )}
                                {adminData && (
                                    <PieChart
                                        chartData={articleData}
                                        option={option}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <DashboardSkeleton />
            )}
        </>
    );
}

export default Dashboard;
