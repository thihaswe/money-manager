"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartDisplay() {
  // Data for the chart
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        // No label here
        data: [10, 20, 30, 40],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Correctly typed chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to resize without maintaining the aspect ratio
    plugins: {
      legend: {
        display: false, // Disable the legend as there is no label
      },
      title: {
        display: true,
        text: "Expense",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      {/* Make the container responsive */}
      <Bar data={data} options={options} />
    </div>
  );
}
