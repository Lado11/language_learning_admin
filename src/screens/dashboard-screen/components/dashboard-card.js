import React from "react";
import "../dashboard-screen.css";
import { useTranslation } from "react-i18next";
import { CustomCardTile } from "../../../components";
import { customCardTileData } from "../../../data";

export const DashboardCard = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboardCardsMainDiv">
      <div className="customCardTileMainDiv">
        {customCardTileData.map((cardInfo, ind) => {
          return (
            <CustomCardTile
              key={ind}
              icon={cardInfo.icon}
              title={t(`${cardInfo.title}`)}
              count={cardInfo.count}
              backgroundColor={cardInfo.backgroundColor}
            />
          );
        })}
      </div>
    </div>
  );
};
