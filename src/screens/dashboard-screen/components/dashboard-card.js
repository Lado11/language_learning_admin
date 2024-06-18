import React from "react";
import "../dashboard-screen.css";
import { useTranslation } from "react-i18next";
import { CustomCardTile } from "../../../components";
import { Colors } from "../../../assets/colors";
import userCardIcon from "../../../assets/images/userCardIcon.svg";
import cardCanceledIcon from "../../../assets/images/cardCanceledIcon.svg";
import addressCardSolid from "../../../assets/images/addressCardSolid.svg";
import graphIcon from "../../../assets/images/graphIcon.svg";

export const DashboardCard = ({ data,loading }) => {
  const { t } = useTranslation();

  const customCardTileData = [
    {
      icon: userCardIcon,
      title: "SUBSCRIPTION",
      count: data?.subscribedUsers,
      backgroundColor: Colors.LIGHT_GREEN,
    },
    {
      icon: cardCanceledIcon,
      title: "CANCELED",
      count: data?.phoneNumberVerifiedUserCount,
      backgroundColor: Colors.LIGHT_ORANGE,
    },
    {
      icon: addressCardSolid,
      title: "REGISTERED",
      count: data?.emailVerifiedUserCount,
      backgroundColor: Colors.LIGHT_BLUE_SECOND,
    },
    {
      icon: graphIcon,
      title: "ACTIVE_USER",
      count: data?.userCount,
      backgroundColor: Colors.LIGHT_PURPLE,
    },
  ];

  return (
    <div className="dashboardCardsMainDiv">
        {customCardTileData?.map((cardInfo, ind) => {
          return (
            <CustomCardTile
            loading={loading}
              key={ind}
              icon={cardInfo.icon}
              title={t(`${cardInfo.title}`)}
              count={cardInfo.count}
              backgroundColor={cardInfo.backgroundColor}
            />
          );
        })}
    </div>
  );
};
