import React, { useState } from "react";
import headerLeftIcon from "../../assets/images/button.svg";
import bellIcon from "../../assets/images/bell-filled.svg";
import messageIcon from "../../assets/images/messageIcon.svg";
import membersIcon from "../../assets/images/membersIcon.svg";
import statisticIcon from "../../assets/images/statisticsIcon.svg";
import logOutIcon from "../../assets/images/logout-svgrepo-com.svg";
import { deleteReduxToken } from "../../store/slices/auth/login-slice";
import { useMediaQuery } from "react-responsive";
import { Colors } from "../../assets/colors/colors";
import "./custom-header.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CustomDrawer } from "../custom-drawer/custom-drawer";

export const CustomHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    dispatch(deleteReduxToken());
  };

  return (
    <div className="customHeaderApp">
      <header className="appHeader">
        <div className="headerFirstPart">
          {isSmallScreen ? (
            <img
              src={headerLeftIcon}
              className="headerIconFirst"
              alt=""
              onClick={() => setOpen(true)}
            />
          ) : null}
          <CustomDrawer open={open} setOpen={setOpen} />
          <p className="headertitle">English app</p>
        </div>
        <div className="headerSecondPart">
          <img src={bellIcon} className="headerIcon bellIcon" alt="" />
          <img src={messageIcon} className="headerIcon" alt="" />
          <img src={membersIcon} className="headerIcon" alt="" />
          <img src={statisticIcon} className="headerIcon" alt="" />
          <img
            alt=""
            src={logOutIcon}
            className="headerIcon logOutIcon"
            onClick={() => {
              logOut();
            }}
          />
        </div>
      </header>
      <Outlet />
    </div>
  );
};
