import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

function PieChart({ chartData, option, location }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold p-2">
        {chartData.datasets[0].label}
      </h1>
      <div
        className={` ${
          location === "loayalty" ? `w-96` : ""
        }  mb-5  items-center justify-center flex`}
      >
        <Doughnut data={chartData} options={option} />
      </div>
    </div>
  );
}

export default PieChart;
