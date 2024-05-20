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
import { useMediaQuery } from "react-responsive";
import { customStatisticsData, customStatisticsOptions } from "../../data";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const StatisticsScreen = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 425 });

  return (
    <div
      className="customstatistics"
      style={
        !isSmallScreen
          ? { width: 440, height: 250 }
          : { width: 300, height: 150 }
      }
    >
      <Bar data={customStatisticsData} options={customStatisticsOptions}></Bar>
    </div>
  );
};
