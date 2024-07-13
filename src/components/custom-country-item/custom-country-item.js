import React from "react";
import "./custom-country-item-style.css";
import { Colors } from "../../assets/colors/colors";
import { CustomSpin } from "../custom-spin";

export const ImageItem = ({ icon, title, loading, count }) => {

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
            {title?.length < 15 ? title : title?.slice(0, 10)}
          </p>
          {count && <div className="langaugeCount">
          <p className="languageItem">language count:</p>
          <p className="languageItem count">{count}</p>
        </div>}
        </div>
        {loading || !icon ? <CustomSpin color={Colors.GRAY_COLOR} size={37} /> : <img className="itemImage" src={icon} alt="img"/>}
      </div>
    </>
  );
};
