import React from "react";
import "./custom-card-tile.css";
import { Colors } from "../../assets/colors/colors";

export const CustomCardTile = ({ icon, title, count, backgroundColor }) => {
  return (
    <div className="customCardTileMainItem">
      <div
        className="customCardTileImage"
        style={{ backgroundColor: backgroundColor }}
      >
        <img src={icon} alt=""/>
      </div>
      <div className="customCardTileTitleDiv">
        <p className="customCardTileTitle" style={{ color: Colors.LIGHT_BLUE }}>
          {title}
        </p>
        <p className="customCardCount">{count}</p>
      </div>
    </div>
  );
};
