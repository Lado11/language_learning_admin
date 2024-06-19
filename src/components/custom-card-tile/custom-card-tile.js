import React from "react";
import "./custom-card-tile.css";
import { Colors } from "../../assets/colors/colors";
import { CustomSpin } from "../custom-spin";

export const CustomCardTile = ({ icon, title, count, backgroundColor ,loading}) => {
  return (
    <div className="customCardTileMainItem">
      <div
        className="customCardTileImage"
        style={{ backgroundColor: backgroundColor }}
      >
        <img src={icon} alt="" />
      </div>
    { loading ?   <CustomSpin size={24} color="gray" />: <div className="customCardTileTitleDiv">
        <p className="customCardTileTitle" style={{ color: Colors.LIGHT_BLUE }}>
         { title}
        </p>
        <p className="customCardCount">{ count}</p>
      </div>}
    </div>
  );
};
