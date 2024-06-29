import React, { useState, useEffect } from "react";
import { SideBarItem } from "./components/side-bar-item";
import { customSideBarData } from "../../data";
import { Colors } from "../../assets/colors/colors";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./custom-sidebar.css";
import { removeAllLanguages, removeAllSelectedData } from "../../store/slices";
import { useDispatch } from "react-redux";

export const CustomSidebar = () => {
  const location = useLocation().pathname
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();


  return (
    <div className="projectOutlet">
      <div className="customSideBar">
        {customSideBarData.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                dispatch(removeAllSelectedData())
                dispatch(removeAllLanguages())
                setSelect(!select);
                localStorage.setItem("item", item.title);
                navigate(item.path);
              }}
            >
              <SideBarItem
                color={ item.color}
                title={t(`${item.title}`)}
                icon={item.icon}
                isSelected={ location.includes(item.path)  }
              />
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
