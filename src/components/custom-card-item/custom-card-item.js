import React from "react";
import "./custom-card-item.css";
import { Colors } from "../../assets/colors/colors";
import { CustomSpin } from "../custom-spin";

export const CustomCardItem = ({ icon, title,loading }) => {

  return (
    <div className="customCardItem" style={{ backgroundColor: Colors.WHITE }}>
      <p className="customCardItemTitle" style={{ color: Colors.LIGHT_GRAY }}>
        {title}
      </p>
     {loading ? <CustomSpin color={Colors.GRAY_COLOR} size={37} />  : <img className="itemImage" src={icon} alt="icon"/>}
    </div>
  );
};
