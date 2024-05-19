import React, { useState, useEffect } from "react";
import { SideBarItem } from "./components/side-bar-item";
import "./custom-sidebar.css";
import { customSideBarData } from "../../data";
import { Colors } from "../../assets/colors/colors";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CustomSidebar = () => {
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  let itemName;

  if (localStorage.getItem("item")) {
    itemName = localStorage.getItem("item");
  } else {
    itemName = customSideBarData[0].title;
  }

  useEffect(() => {
    if (!itemName) {
      localStorage.setItem("item", customSideBarData[0].title);
    }
  }, [itemName]);

  return (
    <div className="projectOutlet">
      <div className="sideBarComponent">
        {customSideBarData.map((item, ind) => {
          return (
            <div
              key={ind}
              onClick={() => {
                setSelect(!select);
                localStorage.setItem("item", item.title);
                navigate(item.path);
              }}
            >
              <SideBarItem
                count={item.count}
                backgroundColor={
                  item.title === itemName ? item.color : Colors.BACKGROUND_COLOR
                }
                color={item.title !== itemName ? item.color : Colors.WHITE}
                title={t(`${item.title}`)}
                icon={item.icon}
                bool={itemName}
              />
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
