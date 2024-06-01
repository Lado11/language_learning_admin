import React, { useEffect } from "react";
import { DashboardCard } from "./components/dashboard-card";
import { useTranslation } from "react-i18next";
import { CustomSpin, CustomTable, StatisticsScreen } from "../../components";
import { columns } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { dashboardGetThunk, getDashboardGetResponse } from "../../store/slices/dashboard/get-dashboard";

export const DashboardScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dashboardData = useSelector(getDashboardGetResponse);
  useEffect(() => {
    dispatch(dashboardGetThunk())
  }, [])

  return (
    <div className="dashboardScreen">
      <div>
        <p className="dashboardTitle">{t("DASHBOARD")}</p>
      </div>
      <div className="dashboardScreenItem">
        <div className="dashboardScreenFirstLine">
          <DashboardCard data={dashboardData?.data}/>
          <StatisticsScreen />
        </div>
        <p  className="dashboardTitle">
          New Registered Users
        </p>

        {false ? <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div> : <div class="container">
          <ul class="responsive-table">
            <li class="table-header">
              {columns?.map((item) => {
                return (
                  <div class="col col-1 label">{item?.text}</div>
                )
              })}
            </li>
            {/* {dashboardData?.data?.map((val, index) => {
              return (
                <li class="table-row">
                  <div class="col col-1 desc" data-label="Job Id">{index + 1}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.email}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                </li>
              )
            })} */}
          </ul>
        </div>}
        {/* <CustomTable /> */}
      </div>
    </div>
  );
};
