import React, { useEffect } from "react";
import { Colors } from "../../assets/colors/colors";
import "../../global-styles/index";
import {
  CustomAddNew,
  CustomPagination,
  CustomSelect,
  CustomSpin,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserGetAllData, getUserGetAllLoading, userGetAllThunk, userGetByIdThunk } from "../../store/slices";
import { columns } from "../../data";

export const UserScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageLength = 5;
  const dispatch = useDispatch();
  const userGetLoading = useSelector(getUserGetAllLoading);
  const userData = useSelector(getUserGetAllData)?.data;
  const dataList = userData?.list;
  
  const data = {
    skip: 0,
    limit: 5,
  };
  useEffect(() => {
    dispatch(userGetAllThunk(data));
  }, []);

  const userUpdate = (id) => {
    localStorage.setItem("userId",id);
    dispatch(userGetByIdThunk(id));
    navigate("/user-update");
  }

 
 
  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <CustomAddNew
          title={"Add New User"}
          onClick={() => {
            navigate("/user-create");
          }}
        />
        <p className="screensTitleStyle">{t("USER")}</p>
        <div className="select-row">
          <CustomSelect title={t("SUBSCRIPTION")} />
          <div className="select_middle">
            <CustomSelect title={t("VERIFED_BY_PHONE")} />
          </div>
          <CustomSelect title={t("VERIFED_BY_EMAIL")} />
        </div>

       {userGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
         <CustomSpin size={64} color="gray" /> 
         </div>: <div class="container">
          <ul class="responsive-table">
            <li class="table-header">
              {columns?.map((item) => {
                return (
                  <div class="col col-1 label">{item?.text}</div>
                )
              })}
            </li>
            {dataList?.map((val, index) => {
              return (
                <li class="table-row" onClick={()=>{
                  userUpdate(val?._id)
                }}>
                  <div class="col col-1 desc" data-label="Job Id">{index + 1}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.email}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                </li>
              )
            })}
          </ul>
        </div>}

      </div>
      <div className="nativeScreenPaginationDiv">
        <CustomPagination length={userData?.total} pageLength={pageLength} />
      </div>
    </div>
  );
};
