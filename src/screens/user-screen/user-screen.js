import React, { useEffect, useState } from "react";
import { Colors } from "../../assets/colors/colors";
import "../../global-styles/index";
import {
  CustomAddNew,
  CustomFilterSeelct,
  CustomPagination,
  CustomSearchInput,
  CustomSelect,
  CustomSpin,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserGetAllData, getUserGetAllLoading, userGetAllThunk, userGetByIdThunk } from "../../store/slices";
import { columns, dataEmail, dataPhone, dataRole, dataUser } from "../../data";
import { dataUserSub, phoneSelect, emailSelect } from "../../data";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filterIcon.png"
import { Popover, Radio } from "antd";

export const UserScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageLength = 5;
  const dispatch = useDispatch();
  const userGetLoading = useSelector(getUserGetAllLoading);
  const userData = useSelector(getUserGetAllData)?.data;
  const dataList = userData?.list;
  const [searchValue, setSearchValue] = useState();

  const data = {
    skip: 0,
    limit: 5,
    search: searchValue ? searchValue : null
  };
  useEffect(() => {
    dispatch(userGetAllThunk(data));
  }, []);

  const onChangeSearch = (e) =>{
    const data = {
      skip: 0,
      limit: 5,
      search: e.target.value ? e.target.value : null
    };
    setSearchValue(e.target.value)
    dispatch(userGetAllThunk(data));
   }
   
  const userUpdate = (id) => {
    localStorage.setItem("userId", id);
    dispatch(userGetByIdThunk(id));
    navigate(`/user/${id}`);
  }
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [valueType, setValueType] = useState(1);
  const onChangeType = (e) => {
    setValueType(e.target.value);
  };

  const [valueEmail, setValueEmail] = useState(1);
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  
  const [valueTypeRole, setValueTypeRole] = useState(1);
  const onChangeRole = (e) => {
    setValueTypeRole(e.target.value);
  };


  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


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
        <div className="filterDiv"> 
        <Popover
          placement="bottomLeft"
          content={<div className="filterSection">
            <p className="popeverTitle">User Subscription</p>
            <Radio.Group onChange={onChange} value={value}>
              <div className="statusGroup">
                {dataUser?.map((option) => {
                  return <Radio  key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                })}
              </div>
            </Radio.Group>
            <hr className="poepverHr" />
            <p className="popeverTitle">Phone number</p>

            <Radio.Group onChange={onChangeType} value={valueType}>
              <div className="statusGroup">
                {dataPhone?.map((option) => {
                  return <Radio   key={option.key}className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                })}
              </div>

            </Radio.Group>
            <hr className="poepverHr" />
            <p className="popeverTitle">Email</p>

            <Radio.Group onChange={onChangeEmail} value={valueEmail}>
              <div className="statusGroup">
                {dataEmail?.map((option) => {
                  return <Radio  key={option.key}  className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                })}
              </div>

            </Radio.Group>
            <hr className="poepverHr" />
            <p className="popeverTitle">Role</p>
            <Radio.Group onChange={onChangeRole} value={valueTypeRole}>
              <div className="statusGroup">
                {dataRole?.map((option) => {
                  return <Radio key={option.key} value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                })}
              </div>
            </Radio.Group>
            <div className="buttonSection">
              <button className="button">Clear</button>
              <button className="buttonApply">Apply</button>
            </div>

          </div>}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <img src={filterIcon} className="popeverOpen" />
        </Popover>
        <CustomSearchInput searchValue={searchValue} onChangeSearch={onChangeSearch}setSearchValue={setSearchValue}/>
        </div>
        {userGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div> : <div> <div className="container">
          <ul className="responsive-table">
            <TableHeader data={columns} />
            {dataList?.map((val, index) => {
              return (
                <li className="table-row" key={index} onClick={() => {
                  userUpdate(val?._id)
                }}>
                  <div className="col col-1 desc" data-label="Job Id">{index + 1}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.email}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div className="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div className="col col-1 desc buttonCol" data-label="Job Id"><p className="titleCol">{(val?.isSubscribed).toString() === true ? "Subscribed" : "UnSubscribed"}</p></div>
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
