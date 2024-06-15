import React, { useEffect } from "react";
import { DashboardCard } from "./components/dashboard-card";
import { useTranslation } from "react-i18next";
import { CustomSpin, CustomTable, StatisticsScreen } from "../../components";
import { columns } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { dashboardGetThunk, getDashboardGetResponse, getDashboardGetloading } from "../../store/slices/dashboard/get-dashboard";
import { getUserGetAllData, getUserGetAllLoading, userGetAllThunk, userGetByIdThunk } from "../../store/slices";
import { useNavigate } from "react-router-dom";

export const DashboardScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboardData = useSelector(getDashboardGetResponse);
  const userData = useSelector(getUserGetAllData)?.data;
  const userGetLoading = useSelector(getUserGetAllLoading);
  const dashboardLoading = useSelector(getDashboardGetloading);

  const dataList = userData?.list;
  useEffect(() => {
    dispatch(dashboardGetThunk())
  }, [])

  const data = {
    skip: 0,
    limit: 10,
  };
  useEffect(() => {
    dispatch(userGetAllThunk(data));
  }, []);

  const seeAllUsers = () => {
    navigate("/user")
    localStorage.setItem("item", "USER")
  }

  const userUpdate = (id) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("item", "USER")
    dispatch(userGetByIdThunk(id));
    navigate("/user-update");
  }


  return (
    <div className="dashboardScreen">
      <div>
        <p className="dashboardTitle">{t("DASHBOARD")}</p>
      </div>
      <div className="dashboardScreenItem">
        <DashboardCard data={dashboardData?.data} loading={dashboardLoading} />
        {/* <StatisticsScreen /> */}
        <p className="dashboardTitle">
          New Registered Users
        </p>

        {false ? <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div> : <div class="container">
          <ul class="responsive-table">
            <li class="table-header">
              {columns?.map((item,index) => {
                return (
                  <div key={index} class="col col-1 label">{item?.text}</div>
                )
              })}
            </li>
            {!dataList?.length && !userGetLoading ? <p>No Data</p> : null}
            {userGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
              <CustomSpin size={64} color="gray" />
            </div> : dataList?.map((val, index) => {
              return (
                <li className="table-row"key={index} onClick={() => {
                  userUpdate(val?._id)
                }} >
                  <div className="col col-1 desc" data-label="Job Id">{index + 1}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.email}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div className="col col-1 desc buttonCol" data-label="Job Id"><p className="titleCol">{(val?.isSubscribed).toString()}</p></div>
                </li>
              )
            })}
          </ul>
        </div>}
        <div className="dashboardButtonDiv">
          <button onClick={seeAllUsers} className="dashboardButton">
            More...
          </button>
        </div>
      </div>
    </div>
  );
};
