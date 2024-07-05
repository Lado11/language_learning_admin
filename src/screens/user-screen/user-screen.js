import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "../../assets/colors/colors";
import "../../global-styles/index";
import {
  CustomAddNew,
  CustomPagination,
  CustomSearchInput,
  CustomSpin,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserGetAllData, getUserGetAllLoading, userGetAllThunk, userGetByIdThunk } from "../../store/slices";
import { tableHeaderData, dataEmail, dataPhone, dataRole, dataUser } from "./user-data";
import { UserInfo, UserRole, UserSubscription } from "./user-typing";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filterIcon.png"
import { Popover, Radio } from "antd";
import { ConstPagiantion } from "../../constants/const-pagination";
import { listItemCountForShow } from "../../constants/constants";

const UserFilterPopover = ({
  onChangeSubscribe,
  onChangeRole,
  onChangeEmail,
  onChangePhone,
  role,
  subscribe,
  email,
  phone,
  onClearFilter,
  onApplyFilter,
  isPopoverOpen,
  handlePopoverOpenChange,
}) => {
  const { t } = useTranslation();

  return (
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
          <button onClick={onClearFilter} className="button">Clear</button>
          <button onClick={onApplyFilter} className="buttonApply">Apply</button>
        </div>
      </div>}
      trigger="click"
      open={isPopoverOpen}
      onOpenChange={handlePopoverOpenChange}
    >
      <img src={filterIcon} className="popeverOpenImg" alt="Filter Icon" />
    </Popover>
  );
};


export const UserListItem = ({ user, onClick, key }) => {
  const getUploadSubscribedLabel = (status) => {
    switch (status) {
      case UserSubscription.SUBSCRIBED:
        return "Subscribed";
      case UserSubscription.UNSUBSCRIBED:
      default:
        return "UnSubscribed";
    }
  };

  return (
    <li className="table-row" key={key} onClick={onClick}>
      <div className="col col-1 desc" data-label="Job Id">{(user?._id).slice(0,10)}</div>
      <div className="col col-1 desc" data-label="Job Id">{user?.firstName}</div>
      <div className="col col-1 desc" data-label="Job Id">{user?.email}</div>
      <div className="col col-1 desc" data-label="Job Id">{user?.phoneNumber}</div>
      <div className="col col-1 desc" data-label="Job Id">{user?.firstName}</div>
      <div className="col col-1 desc" data-label="Job Id">{user?.phoneNumber}</div>
      <div className="col col-1 desc buttonCol" style={{backgroundColor: user?.isSubscribed === true ? Colors.GREEN : Colors.LIGHT_PURPLE}} data-label="Job Id"><p className="titleCol">{
        getUploadSubscribedLabel(user?.isSubscribed)
      }</p></div>
    </li>
  );
};

export const UserScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGetLoading = useSelector(getUserGetAllLoading);
  const userData = useSelector(getUserGetAllData)?.data;
  const dataList = userData?.list;
  const [searchValue, setSearchValue] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [filtterSsubscribe, setFiltterSsubscribe] = useState(undefined);
  const [subscribe, setSubscribe] = useState();
  const [filtterPhone, setFiltterPhone] = useState(undefined);
  const [phone, setPhone] = useState();
  const [filtterEmail, setFiltterEmail] = useState(undefined);
  const [email, setEmail] = useState();
  const [filtterRole, setFiltterRole] = useState(undefined);
  const [role, setRole] = useState();


  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setSearchFilter(e.target.value)
      const skip = 0
      fetchFilteredData(skip)
    } else {
      dispatch(userGetAllThunk(ConstPagiantion(0, listItemCountForShow)));
      setSearchFilter(undefined)
    }
  }

  const userUpdate = (id) => {
    dispatch(userGetByIdThunk(id));
    navigate(`/user/${id}`);
  }

  const onChangePagination = (current) => {
    const skip =( current -1 ) * listItemCountForShow;    
    fetchFilteredData(skip);
  };

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

  const fetchData = useCallback(() => {
    dispatch(userGetAllThunk(ConstPagiantion(0, listItemCountForShow)));
  }, [dispatch]);

  const fetchFilteredData = useCallback((skip = 0) => {
    const filterData = {
      skip: skip,
      limit: listItemCountForShow,
      isSubscribed: filtterSsubscribe,
      phoneNumberVerified: filtterPhone,
      emailVerified: filtterEmail,
      role: filtterRole,
      search: searchFilter
    };
    console.log(filterData,"filter Data");
    dispatch(userGetAllThunk(filterData));
  }, [dispatch, filtterSsubscribe, filtterPhone, filtterEmail, filtterRole, searchFilter]);

  const handlePopoverOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const handleClearFilter = () => {
    setSubscribe("")
    setPhone("")
    setFiltterEmail(undefined)
    setFiltterPhone(undefined)
    setFiltterRole(undefined)
    setFiltterSsubscribe(undefined)
    setEmail("")
    setRole("")
    fetchData()
  };

  const handleApplyFilter = () => {
    fetchFilteredData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 return (
    <div
      className="nativeLanguageScreenMainDiv "
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <CustomAddNew
          title={"Add New User"}
          onClick={() => {
            navigate("/user/create");
          }}
        />
        <p className="screensTitleStyle">{t("USER")}</p>
        <div className="filterDiv">
          <UserFilterPopover
            subscribe={subscribe}
            phone={phone}
            email={email}
            role={role}
            onChangePhone={onChangePhone}
            onChangeEmail={onChangeEmail}
            onChangeRole={onChangeRole}
            onChangeSubscribe={onChangeSubscribe}
            onClearFilter={handleClearFilter}
            onApplyFilter={handleApplyFilter}
            isPopoverOpen={isPopoverOpen}
            handlePopoverOpenChange={handlePopoverOpenChange}
          />
          <CustomSearchInput searchValue={searchValue} onChangeSearch={onChangeSearch} setSearchValue={setSearchValue} />
        </div>

        {userGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div> : <div> <div className="container">
          <ul className="responsive-table">
            <TableHeader data={tableHeaderData} />
            {dataList?.map((user, index) => {
              return (
                <UserListItem key={index}
                  user={user}
                  onClick={() => userUpdate(user?._id)} />)
            })}
          </ul>
        </div>
        </div>}
        <div className="nativeScreenPaginationDiv">
          <CustomPagination length={userData?.total} pageLength={listItemCountForShow} onChange={onChangePagination} />
        </div>
      </div>

    </div>
  );
};
