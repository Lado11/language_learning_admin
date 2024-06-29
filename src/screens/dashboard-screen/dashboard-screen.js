import React, { useEffect } from "react";
import { DashboardCard } from "./components/dashboard-card";
import { useTranslation } from "react-i18next";
import { CustomNoData, CustomSpin } from "../../components";
import { tableHeaderData } from "./dashboard-data";
import { useDispatch, useSelector } from "react-redux";
import { dashboardGetThunk, getDashboardGetResponse, getDashboardGetloading } from "../../store/slices/dashboard/get-dashboard";
import { getUserGetAllData, getUserGetAllLoading, userGetAllThunk, userGetByIdThunk } from "../../store/slices";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { listItemCountForShow} from "../../constants/constants";
import { ConstPagiantion } from "../../constants/const-pagination";
import { UserListItem } from "../user-screen/user-screen";


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


  useEffect(() => {
    dispatch(userGetAllThunk(ConstPagiantion(0, listItemCountForShow)));
  }, []);

  const seeAllUsers = () => {
    navigate("/user")
    localStorage.setItem("item", "USER")
  }

  const userUpdate = (id) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("item", "USER")
    dispatch(userGetByIdThunk(id));
    navigate(`/user/${id}`);
  }

  return (
    <div className="nativeLanguageScreenMainDiv">
      <div>
        <div>
          <p className="dashboardTitle">{t("DASHBOARD")}</p>
        </div>
        <div className="dashboardScreenItem">
          <DashboardCard data={dashboardData?.data} loading={dashboardLoading} />
          {/* <StatisticsScreen /> */}
          <p className="dashboardTitle">
            New Registered Users
          </p>

          {userGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
            <CustomSpin size={64} color="gray" />
          </div> : <div className="container">
            <ul className="responsive-table">
              <TableHeader data={tableHeaderData} />
              {!dataList?.length && !userGetLoading ? <CustomNoData /> :
                dataList?.map((user, index) => {
                  return (
                    <UserListItem
                      key={index}
                      user={user}
                      onClick={() => userUpdate(user?._id)} />
                  )
                })}
              {!dataList?.length && !userGetLoading ? null : <div className="dashboardButtonDiv">
                <button onClick={seeAllUsers} className="dashboardButton">
                  More...
                </button>
              </div>}
            </ul>

          </div>}
        </div>
      </div>
    </div>
  );
};
