import React from "react";
import { DashboardCard } from "./components/dashboard-card";
import { useTranslation } from "react-i18next";
import { CustomTable, StatisticsScreen } from "../../components";

export const DashboardScreen = () => {
  const { t } = useTranslation();
  

  return (
    <div className="dashboardScreen">
      <div>
        <p className="dashboardTitle">{t("DASHBOARD")}</p>
      </div>
      <div className="dashboardScreenItem">
        <div className="dashboardScreenFirstLine">
          <DashboardCard />
          <StatisticsScreen />
        </div>
        <CustomTable />
      </div>
    </div>
  );
};
