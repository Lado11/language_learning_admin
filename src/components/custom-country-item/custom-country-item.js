import React from "react";
import "./custom-country-item-style.css";
import { Colors } from "../../assets/colors/colors";
import britishIcon from "../../assets/images/britishCountryIcon.svg.svg";

export const CustomCountryItem = ({ icon, title }) => {
  const url = process.env.REACT_APP_BASE_URL;
  const image = url + icon;

  return (
    <>
      <div
        className="customCountryItem"
        style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
      >
        <p
          className="customCountryItemTitle"
          style={{ color: Colors.LIGHT_GRAY }}
        >
          {title.length < 15 ? title : title.slice(0, 10)}
        </p>
        <img src={britishIcon} />
      </div>
    </>
  );
};
