import React, { useEffect } from "react";
import { Colors } from "../../assets/colors/colors";
import "../../global-styles/index";
import {
  CustomAddNew,
  CustomFilterSeelct,
  CustomPagination,
  CustomSelect,
  CustomSpin,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserGetAllData, getUserGetAllLoading, userGetAllThunk, userGetByIdThunk } from "../../store/slices";
import { columns } from "../../data";
import { dataUserSub, phoneSelect, emailSelect } from "../../data";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filter.png"

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
    localStorage.setItem("userId", id);
    dispatch(userGetByIdThunk(id));
    navigate(`/user-update/:${id}`);
  }


  return (
    <div
      className="nativeLanguageScreenMainDiv "
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
        {/* <img src={filterIcon}/> */}
        {/* <CustomFilterSeelct/> */}
        {/* <div className="select-row words_select">
          <CustomSelect data={dataUserSub} optionsData={dataUserSub} title={t("SUBSCRIPTION")} />
          <div className="select_middle">
            <CustomSelect data={phoneSelect} title={t("VERIFED_BY_PHONE")} />
          </div>
          <CustomSelect data={emailSelect} title={t("VERIFED_BY_EMAIL")} />
        </div> */}

        {userGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div> :<div> <div class="container">
          <ul class="responsive-table">
            <TableHeader data={columns} />
            {dataList?.map((val, index) => {
              return (
                <li class="table-row" key={index} onClick={() => {
                  userUpdate(val?._id)
                }}>
                  <div class="col col-1 desc" data-label="Job Id">{index + 1}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.email}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc buttonCol" data-label="Job Id"><p className="titleCol">{(val?.isSubscribed).toString()}</p></div>
                </li>
              )
            })}
          </ul>
        </div>
        
        </div>}
        <div className="nativeScreenPaginationDiv">
         <CustomPagination length={userData?.total} pageLength={5} />
       </div> 
      </div>
    
    </div>
  );
};
