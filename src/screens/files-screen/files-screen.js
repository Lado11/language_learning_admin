import { useCallback, useEffect, useState } from "react";
import { Colors } from "../../assets/colors";
import { CustomCardTile } from "../../components/custom-card-tile/custom-card-tile";
import { customFilesData } from "../../data/custom-files-data";
import { customFilesDirectoryData } from "../../data/custom-files-directory";
import "./files-screen.css";
import filterIcon from "../../assets/images/filterIcon.png"
import { Popover, Radio } from "antd";
import { ConstPagiantion } from "../../constants/const-pagination";
import { page0, page5, page6 } from "../../constants/constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fileTypes, fileUsedObj } from "./files-data";
import { CustomSearchInput } from "../../components";
// const UserFilterPopover = ({
//   onChangeSubscribe,
//   onChangeRole,
//   onChangeEmail,
//   onChangePhone,
//   role,
//   subscribe,
//   email,
//   phone,
//   onClearFilter,
//   onApplyFilter,
//   isPopoverOpen,
//   handlePopoverOpenChange,
// }) => {
//   const { t } = useTranslation();

//   return (
//     <Popover
//       placement="bottomLeft"
//       content={<div className="filterSection">
//         <p className="popeverTitle">File Type</p>
//         <Radio.Group onChange={onChangeSubscribe} value={subscribe}>
//           <div className="statusGroup">
//             {fileTypes?.map((option) => {
//               return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
//             })}
//           </div>
//         </Radio.Group>
//         <hr className="poepverHr" />
//         <p className="popeverTitle">Used Objects</p>

//         <Radio.Group onChange={onChangePhone} value={phone}>
//           <div className="statusGroup">
//             {fileUsedObj?.map((option) => {
//               return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
//             })}
//           </div>

//         </Radio.Group>
        
//         <div className="buttonSection">
//           <button onClick={onClearFilter} className="button">Clear</button>
//           <button onClick={onApplyFilter} className="buttonApply">Apply</button>
//         </div>
//       </div>}
//       trigger="click"
//       open={isPopoverOpen}
//       onOpenChange={handlePopoverOpenChange}
//     >
//       <img src={filterIcon} className="popeverOpenImg" alt="Filter Icon" />
//     </Popover>
//   );
// };
export const FilesScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  // const onChangeSearch = (e) => {
  //   setSearchValue(e.target.value);
  //   if (e.target.value !== "") {
  //     setSearchFilter(e.target.value)
  //     let data = {
  //       skip: page0,
  //       limit: page5,
  //       search: e.target.value
  //     }
  //     dispatch(userGetAllThunk(data));
  //   } else {
  //     dispatch(userGetAllThunk(ConstPagiantion(page0, page5)));
  //     setSearchFilter(undefined)
  //   }
  // }
  // const onChangeSubscribe = (e) => {
  //   setSubscribe(e.target.value);
  //   if (e.target.value !== UserSubscription.All) {
  //     setFiltterSsubscribe(e.target.value)
  //   } else {
  //     setFiltterSsubscribe(undefined)
  //   }
  // };

  // const onChangePhone = (e) => {
  //   setPhone(e.target.value);
  //   if (e.target.value !== UserInfo.All) {
  //     setFiltterPhone(e.target.value)
  //   } else {
  //     setFiltterPhone(undefined)
  //   }
  // };

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  //   if (e.target.value !== UserInfo.All) {
  //     setFiltterEmail(e.target.value)
  //   } else {
  //     setFiltterEmail(undefined)
  //   }
  // };

  // const onChangeRole = (e) => {
  //   setRole(e.target.value);
  //   if (e.target.value !== UserRole.All) {
  //     setFiltterRole(e.target.value)
  //   } else {
  //     setFiltterRole(undefined)
  //   }
  // };

  // const fetchData = useCallback(() => {
  //   dispatch(userGetAllThunk(ConstPagiantion(page0, page6)));
  // }, [dispatch]);

  // const fetchFilteredData = useCallback(() => {
  //   const filterData = {
  //     skip: page0,
  //     limit: page6,
  //     isSubscribed: filtterSsubscribe,
  //     phoneNumberVerified: filtterPhone,
  //     emailVerified: filtterEmail,
  //     role: filtterRole,
  //     search: searchFilter
  //   };
  //   dispatch(userGetAllThunk(filterData));
  // }, [dispatch, filtterSsubscribe, filtterPhone, filtterEmail, filtterRole, searchFilter]);

  // const handlePopoverOpenChange = (newOpen) => {
  //   setIsPopoverOpen(newOpen);
  // };


  // const handleClearFilter = () => {
  //   setSubscribe("")
  //   setPhone("")
  //   setEmail("")
  //   setRole("")
  //   fetchData()
  // };

  // const handleApplyFilter = () => {
  //   fetchFilteredData();
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);


  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <p className="filesTitle">File</p>
      <div className="filterDiv">
          {/* <UserFilterPopover
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
          <CustomSearchInput searchValue={searchValue} onChangeSearch={onChangeSearch} setSearchValue={setSearchValue} /> */}
        </div>
      {/* <div className="filesItemDiv">

        {customFilesData.map((item,index) => {
          return (
              <CustomCardTile
              key={index}
              icon={item.icon}
              title={t(`${item.title}`)}
              count={item.count}
              backgroundColor={item.backgroundColor}
            />
          );
        })}
      </div> */}
      {/* <div>

        {customFilesDirectoryData.map((item,index) => {
          return (
            <div className="filesDirection" key={index+1}>
              <img src={item.icon} />
              <p className="filesDirectionTitle">{item.title}</p>
            </div>
          );
        })}
      </div> */}

    </div>
  );
};
