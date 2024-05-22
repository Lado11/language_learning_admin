import React, { useState, useEffect } from "react";
import Drawer from "react-drawer";
import "react-drawer/lib/react-drawer.css";
import "./custom-drawer.css";
import { customSideBarData } from "../../data";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "../custom-sidebar/components/side-bar-item";
import { Colors } from "../../assets/colors/colors";

export const CustomDrawer = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();
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
    <div className="drawer_mobile">
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position="left"
        modalElementClass="modal"
      >
        {customSideBarData.map((item) => {
          return (
            <div
              key={item.id}
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
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
