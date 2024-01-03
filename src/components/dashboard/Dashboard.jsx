import useFetch from "../../hooks/useFetch";

import DashboardSkeleton from "../__helperComponents__/DashboardSkeleton";
import PageTitle from "../__helperComponents__/PageTitle";
import PieChart from "./charts/PieChart";
import InfoCards from "./InfoCards";

export default function Dashboard() {
  const { loading, fetchedData } = useFetch("site-admin/admin-dashboard");

  let surveyData = {
    labels: ["Total Survey", "Public Survey"],
    datasets: [
      {
        label: "Surveys",
        data: Object.values(
          fetchedData?.data.surveyData ? fetchedData?.data.surveyData : [],
        ),
        backgroundColor: ["rgba(164, 57, 72, 1)", "rgba(234, 82, 95, 1)"],
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
          fetchedData?.data.loyaltyPointData
            ? fetchedData?.data.loyaltyPointData
            : [],
        ),
        backgroundColor: ["rgba(164, 57, 72, 1)", "rgba(234, 82, 95, 1)"],
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
          fetchedData?.data?.articleData ? fetchedData?.data?.articleData : [],
        ),
        backgroundColor: ["rgba(164, 57, 72, 1)", "rgba(234, 82, 95, 1)"],
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

  if (fetchedData?.data.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-2xl font-semibold">
        No Data to show!
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageTitle name={"Dashboard"} />
        {!loading ? (
          <div className="flex flex-col gap-6">
            <div className="flex w-full gap-6">
              <InfoCards
                title={"Total User"}
                value={fetchedData?.data ? fetchedData?.data?.totalUsers : ""}
              />
              <InfoCards title={"Active User"} value={5} />
              <InfoCards
                title={"Total Android Download"}
                value={
                  fetchedData?.data
                    ? fetchedData?.data?.downloadData?.android
                    : ""
                }
              />
              <InfoCards
                title={"Total Ios Download"}
                value={
                  fetchedData?.data ? fetchedData?.data?.downloadData?.iOS : ""
                }
              />
            </div>

            <div>
              <div className="mt-5 grid grid-cols-3 rounded-lg bg-white p-6">
                {fetchedData?.data && (
                  <PieChart chartData={surveyData} option={option} />
                )}
                {fetchedData?.data && (
                  <PieChart chartData={loyaltyData} option={option} />
                )}
                {fetchedData?.data && (
                  <PieChart chartData={articleData} option={option} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <DashboardSkeleton />
        )}
      </div>
    </>
  );
}
