import { React, useState, useEffect } from "react";
import PieChart from "./charts/PieChart";
import { PieData } from "./charts/mockData";
// import GeoLoaction from "./charts/GeoLoaction";
import makeRequest from "../../utils/makeRequest";

function addValue(lowerValue, upperValue, name) {
    for (let i in PieData) {
        if (PieData[i].name === name) {
            PieData[i].data[0].value = lowerValue;
            PieData[i].data[1].value = upperValue;
        }
    }
}

function Dashboard() {
    const [adminData, setAdminData] = useState([]);

    const getAdminData = async () => {
        const response = await makeRequest(
            "/site-admin/admin-dashboard",
            "GET"
        );
        response.isSuccess
            ? setAdminData(response.data)
            : alert(response.message);
    };

    useEffect(() => {
        getAdminData();
    }, []);

    if (adminData) {
        addValue(
            adminData?.surveyData?.publicSurvey,
            adminData?.surveyData?.totalSurvey,
            "Survey Data"
        );
        addValue(
            adminData?.loyaltyPointData?.totalLoyaltyPoint,
            adminData?.loyaltyPointData?.usedLoyaltyPoint,
            "loyalty Point Data"
        );
        addValue(
            adminData?.articleData?.publicArticles,
            adminData?.articleData?.totalArticles,
            "Article Data"
        );
    }

    console.log(adminData);
    return (
        <>
            <div>
                <h1 className=" text-4xl font-semibold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-3 w-full  h-96">
                {PieData.map((item, index) => {
                    return <PieChart key={index} value={item} />;
                })}
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
