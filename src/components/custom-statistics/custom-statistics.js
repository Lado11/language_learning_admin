import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./custom-statistics.css";
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from 'react-responsive';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const StatisticsScreen = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 425 });
  const data = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "369",
        data: [3, 6, 9, 5, 8, 2, 1, 4, 4],
        backgroundColor: "#EDF0F7",
        borderRadius: "10",
        selectedColor: "#FF6633",
        hoverBackgroundColor: ["#FF6633"],
        borderWidth: 0,
      }, //
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        grid: {
          display: false, // Removes the background lines from the x-axis
        },
      },
      y: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        grid: {
          display: false, // Removes the background lines from the y-axis
        },
        ticks: {
          display: false,
        },
        drawBorder: false,
      },
    },
  };

  return (
    <div className="customstatistics" style={!isSmallScreen ? { width: 440, height: 250 } : { width: 300, height: 150 }}>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};
