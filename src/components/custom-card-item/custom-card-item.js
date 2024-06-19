import React from "react";
import "./custom-card-item.css";
import { Colors } from "../../assets/colors/colors";

export const CustomCardItem = ({ icon, title }) => {
  return (
    <div className="customCardItem" style={{ backgroundColor: Colors.WHITE }}>
      <p className="customCardItemTitle" style={{ color: Colors.LIGHT_GRAY }}>
        {title}
      </p>
      <img src={icon} alt="icon"/>
    </div>
  );
};
