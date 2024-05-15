import React from "react";
import "./side-bar-item.css";
import { Colors } from "../../../assets/colors/colors";

export const SideBarItem = ({
  title,
  icon,
  color,
  backgroundColor,
  bool,
  count,
}) => {
  return (
    <div>
      <div className="sideBarItem" style={{ backgroundColor: backgroundColor }}>
        <svg
          width="25"
          height="22"
          viewBox="0 0 25 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={icon} fill={bool != title ? color : Colors.WHITE} />
        </svg>
        <p className="sideBarItemTitle" style={{ color: color }}>
          {title}
        </p>
        {count ? (
          <div className="countStyle" style={{ backgroundColor: "#8833FF40" }}>
            <p style={{ color: color }}>{count}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
