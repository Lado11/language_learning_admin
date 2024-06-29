import React from "react";
import "./side-bar-item.css";
import { Colors } from "../../../assets/colors/colors";

export const SideBarItem = ({
  title,
  icon,
  color,
  isSelected,
}) => {
  return (
    <div>
      <div className="sideBarItem" style={{ backgroundColor: isSelected ? color : Colors.BACKGROUND_COLOR }}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={icon} fill={isSelected ? Colors.WHITE : color } />
        </svg>
        <p className="sideBarItemTitle" style={{ color: isSelected ? Colors.WHITE : color }}>
          {title}
        </p>
      </div>
    </div>
  );
};
