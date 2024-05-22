import React, { useState } from "react";
import headerLeftIcon from "../../assets/images/button.svg";
import bellIcon from "../../assets/images/bell-filled.svg";
import messageIcon from "../../assets/images/messageIcon.svg";
import membersIcon from "../../assets/images/membersIcon.svg";
import statisticIcon from "../../assets/images/statisticsIcon.svg";
import logOutIcon from "../../assets/images/logout-svgrepo-com.svg";
import {
  deleteReduxToken,
  getToken,
} from "../../store/slices/auth/login-slice";
import { useMediaQuery } from "react-responsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomDrawer } from "../custom-drawer/custom-drawer";
import "./custom-header.css";

export const CustomHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const reduxToken = useSelector(getToken);
  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.clear();
    dispatch(deleteReduxToken());
    // navigate("/");
    window.location.reload();
  };

  return (
    <div className="customHeaderMainDiv">
      <header className="appHeader">
        <div className="headerFirstPart">
          {isSmallScreen ? (
            <img
              src={headerLeftIcon}
              className="headerLeftIcon"
              alt=""
              onClick={() => setOpen(true)}
            />
          ) : null}
          <CustomDrawer open={open} setOpen={setOpen} />
          <p className="headertitle">English app</p>
        </div>
        <div className="headerSecondPart">
          <img src={bellIcon} className="headerIcon bellIcon" alt="bell icon" />
          <img src={messageIcon} className="headerIcon" alt="message icon" />
          <img src={membersIcon} className="headerIcon" alt="member icon" />
          <img
            src={statisticIcon}
            className="headerIcon"
            alt="statistics icon"
          />
          <img
            alt=""
            src={logOutIcon}
            className="headerIcon logOutIcon"
            onClick={logOut}
          />
        </div>
      </header>
      <Outlet />
    </div>
  );
};
