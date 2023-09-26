import { React, useState, useEffect } from "react";
import PieChart from "./charts/PieChart";
import { UserData } from "./charts/mockData";
// import GeoLoaction from "./charts/GeoLoaction";
import makeRequest from "../../utils/makeRequest";

// function addValue(lowerValue, upperValue, name) {
//     for (let i in PieData) {
//         if (PieData[i].name === name) {
//             PieData[i].data[0].value = lowerValue;
//             PieData[i].data[1].value = upperValue;
//         }
//     }
// }
function Dashboard() {
    const [adminData, setAdminData] = useState({});
    let surveyData = {
        labels: ["Public Survey", "Total Survey"],
        datasets: [
            {
                label: "Survey Data",
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
        labels: ["Public Articles", "Total Articles"],
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

    const getAdminData = async () => {
        const response = await makeRequest(
            "/site-admin/admin-dashboard",
            "GET"
        );
        response.isSuccess
            ? setAdminData(response.data)
            : alert(response.message);
        // if (adminData?.length != 0) {
        //     console.log(Object.values(adminData?.surveyData));
        // }
    };

    useEffect(() => {
        getAdminData();
    }, []);

    // console.log(adminData.surveyData);
    console.log(adminData);
    return (
        <>
            <div>
                <h1 className=" text-4xl font-semibold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-3 gap-4  w-full ">
                {adminData && <PieChart chartData={surveyData} />}
                {adminData && <PieChart chartData={loyaltyData} />}
                {adminData && <PieChart chartData={articleData} />}
                {/* {PieData.map((item, index) => {
                    return <PieChart key={index} value={item} />;
                })} */}
            </div>
            {adminData && (
                <div className="grid grid-cols-2 h-96">
                    <div className="flex w-full justify-between">
                        <div className="h-32 bg-white w-1/2 m-2 p-5">
                            <h2 className="text-2xl font-bold">
                                Total User:{adminData?.totalUsers}
                            </h2>
                        </div>
                        {/* <GeoLoaction /> */}
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
                    <div className=" bg-white flex justify-between m-2 text-center items-center">
                        <h2 className=" w-full">Map</h2>
                    </div>

                    {/* <GeoLoaction /> */}
                </div>
            )}
        </>
    );
}

export default Dashboard;
