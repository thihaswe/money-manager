"use client";

import React, { useEffect, useState } from "react";
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
import { Box, Input } from "@mui/material";
import { Note } from "@prisma/client";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MyBarChart({ rawData }: { rawData: any[] }) {
  const [date, setDate] = useState("");
  const tdy = new Date();
  const month = String(tdy.getMonth() + 1).padStart(2, "0");
  const year = tdy.getFullYear();
  const formattedMonth = `${year}-${month}`;

  useEffect(() => {
    setDate(formattedMonth); // Initialize with current month
  }, [formattedMonth]);

  // Function to filter and group data by the selected month
  const groupByDate = (data: Note[], currentDate: string) => {
    const totals: Record<string, number> = {};

    // Split the selected currentDate (formatted as YYYY-MM)
    const [selectedYear, selectedMonth] = currentDate.split("-");

    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const weekday = date.toLocaleString("en-US", { weekday: "short" });

      // Only include items that match the selected month and year
      if (year === parseInt(selectedYear) && month === selectedMonth) {
        const formattedDate = `${year}.${month}.${day} (${weekday})`;

        if (!totals[formattedDate]) {
          totals[formattedDate] = 0;
        }

        totals[formattedDate] += item.amount;
      }
    });

    return totals;
  };

  // Filter rawData based on the selected date (month and year)
  const totalsByDate = groupByDate(rawData, date);

  const labels = Object.keys(totalsByDate);
  const dataset = Object.values(totalsByDate);

  const data = {
    labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Total Amount Per Date" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 500 },
      },
    },
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Input
        type="month"
        value={date}
        onChange={(e) => {
          setDate(e.target.value); // Update the selected date
        }}
      />
      <Box style={{ width: "100%", height: "400px" }}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
}
