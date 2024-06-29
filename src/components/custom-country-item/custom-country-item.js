import React from "react";
import "./custom-country-item-style.css";
import { Colors } from "../../assets/colors/colors";
import { CustomSpin } from "../custom-spin";

export const CustomCountryItem = ({ icon, title, loading, count }) => {
  return (
    <>
      <div
        className="customCountryItem"
        style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
      >
        <div className="imageRow">
          <p
            className="customCountryItemTitle"
            style={{ color: Colors.LIGHT_GRAY }}
          >
            {title.length < 15 ? title : title.slice(0, 10)}
          </p>
          {loading ? <CustomSpin color={Colors.GRAY_COLOR} size={37} /> : <img className="itemImage" src={icon} />}
        </div>
       {count && <div className="langaugeCount">
          <p>language count</p>
          <p>{count}</p>
        </div>}
      </div>
    </>
  );
};
