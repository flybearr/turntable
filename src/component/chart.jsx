import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js/auto";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
import { parkingData } from "../Data/parkingData";

export default function MultipleChart() {
  const [parkingDatas, setParkingData] = useState({
    labels: parkingData.map((v, i) => v.month + "月"),
    datasets: [
      {
        type: "line",
        label: "Dataset 1",
        borderColor: "rgb(00, 99, 132)",
        backgroundColor: ["blue"],
        borderWidth: 2,
        fill: false,

        data: parkingData.map((v, i) => v.paymoney),
      },
      {
        type: "bar",
        label: "Dataset 2",
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: ["#ff6b21", "#faebd7"],
        borderWidth: 2,
        fill: false,
        data: parkingData.map((v, i) => v.paymoney),
      },
    ],
  });
  return (
    <div style={{ width: 700 }}>
      <Chart
        type="bar"
        data={parkingDatas}
        options={{
          scales: {
            x: { title: { display: true, text: "月份" } },
            y: {
              ticks: {
                callback: function (value, i, ticks) {
                  return "$" + value;
                },
              },
              title: {
                display: true,
                text: "money",
                font: { size: 20 },
                align: "end",
                position: "left",
              },
            },
          },
        }}
      />
    </div>
  );
}
