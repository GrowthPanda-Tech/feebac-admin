import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

function PieChart({ chartData, option }) {
    console.log(chartData.datasets[0].label);
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-semibold p-8">
                {chartData.datasets[0].label}
            </h1>
            <div className=" w-96">
                <Doughnut data={chartData} options={option} />
            </div>
        </div>
    );
}

export default PieChart;
