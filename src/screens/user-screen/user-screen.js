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
import { UserInfo, UserRole, UserSubscription, columns, dataEmail, dataPhone, dataRole, dataUser } from "../../data";
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
  const [searchFilter, setSearchFilter] = useState();

  const data = {
    skip: 0,
    limit: 5,
  };

  useEffect(() => {
    dispatch(userGetAllThunk(data));
  }, []);

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setSearchFilter(e.target.value)
      let data = {
        skip: 0,
        limit: 5,
        search: e.target.value
      }
      dispatch(userGetAllThunk(data));

    } else {
      let data = {
        skip: 0,
        limit: 5,
      }
      dispatch(userGetAllThunk(data));
      setSearchFilter(undefined)
    }
  }

  const userUpdate = (id) => {
    localStorage.setItem("userId", id);
    dispatch(userGetByIdThunk(id));
    navigate(`/user/${id}`);
  }



  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const [filtterSsubscribe, setFiltterSsubscribe] = useState(undefined);
  const [subscribe, setSubscribe] = useState();

  const [filtterPhone, setFiltterPhone] = useState(undefined);
  const [phone, setPhone] = useState();

  const [filtterEmail, setFiltterEmail] = useState(undefined);
  const [email, setEmail] = useState();

  const [filtterRole, setFiltterRole] = useState(undefined);
  const [role, setRole] = useState();

  const onChangeSubscribe = (e) => {
    setSubscribe(e.target.value);
    if (e.target.value !== UserSubscription.All) {
      setFiltterSsubscribe(e.target.value)
    } else {
      setFiltterSsubscribe(undefined)
    }
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    if (e.target.value !== UserInfo.All) {
      setFiltterPhone(e.target.value)
    } else {
      setFiltterPhone(undefined)
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== UserInfo.All) {
      setFiltterEmail(e.target.value)
    } else {
      setFiltterEmail(undefined)
    }
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
    if (e.target.value !== UserRole.All) {
      setFiltterRole(e.target.value)
    } else {
      setFiltterRole(undefined)
    }
  };

  const filterData = {
    skip: 0,
    limit: 6,
    isSubscribed: filtterSsubscribe,
    phoneNumberVerified: filtterPhone,
    emailVerified: filtterEmail,
    role: filtterRole,
    search: searchFilter
  }

  const clearFilter = () => {
    setSubscribe("")
    setPhone("")
    setEmail("")
    setRole("")
    dispatch(userGetAllThunk(data))
  }

  const sendFilter = () => {
    dispatch(userGetAllThunk(filterData))
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
        <div className="filterDiv">
          <Popover
            placement="bottomLeft"
            content={<div className="filterSection">
              <p className="popeverTitle">User Subscription</p>
              <Radio.Group onChange={onChangeSubscribe} value={subscribe}>
                <div className="statusGroup">
                  {dataUser?.map((option) => {
                    return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                  })}
                </div>
              </Radio.Group>
              <hr className="poepverHr" />
              <p className="popeverTitle">Phone number</p>

              <Radio.Group onChange={onChangePhone} value={phone}>
                <div className="statusGroup">
                  {dataPhone?.map((option) => {
                    return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                  })}
                </div>

              </Radio.Group>
              <hr className="poepverHr" />
              <p className="popeverTitle">Email</p>

              <Radio.Group onChange={onChangeEmail} value={email}>
                <div className="statusGroup">
                  {dataEmail?.map((option) => {
                    return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                  })}
                </div>

              </Radio.Group>
              <hr className="poepverHr" />
              <p className="popeverTitle">Role</p>
              <Radio.Group onChange={onChangeRole} value={role}>
                <div className="statusGroup">
                  {dataRole?.map((option) => {
                    return <Radio key={option.key} value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                  })}
                </div>
              </Radio.Group>
              <div className="buttonSection">
                <button onClick={clearFilter} className="button">Clear</button>
                <button onClick={sendFilter} className="buttonApply">Apply</button>
              </div>

            </div>}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <img src={filterIcon} className="popeverOpen" />
          </Popover>
          <CustomSearchInput searchValue={searchValue} onChangeSearch={onChangeSearch} setSearchValue={setSearchValue} />
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
