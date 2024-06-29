import React from "react";
import "./home-screen.css";
import { CustomSidebar } from "../../components";
import { DashboardScreen } from "../dashboard-screen/dashboard-screen";
import { useMediaQuery } from "react-responsive";

export const HomeScreen = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="dashboardMainDiv">
        {!isSmallScreen && <CustomSidebar />}
        <DashboardScreen />
    </div>
  );
};
