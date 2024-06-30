import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Radio } from "antd";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";
import { filesGetThunk, getfilesGetResponse, getfilesGetloading } from "../../store/slices/files/get-files";
import { ConstPagiantion } from "../../constants/const-pagination";
import { listItemCountForShow } from "../../constants/constants";
import { fileTypes, fileUsedObj } from "./files-data";
import { CustomNoData, CustomPagination, CustomSearchInput, CustomSpin } from "../../components";
import { MediaTypes, UserObjectType } from "./files-typing";
import voiceIcon from "../../assets/images/sound-waves 1 (1).png";
import filterIcon from "../../assets/images/filterIcon.png";
import { Colors } from "../../assets/colors";
import "./files-screen.css";

const FilesItem = ({ data, imageUrls, loading , naviagte }) => {

  const getFilesTypeIcon = (type, id) => {
    switch (type) {
      case MediaTypes.IMAGE:
        return imageUrls[id];
      case MediaTypes.AUDIO:
      default:
        return voiceIcon;
    }
  };

  const getFilesTypeLabel = (type) => {
    switch (type) {
      case UserObjectType.NATIVELANGUAGE:
        return "Native Langauge";
      case UserObjectType.LEARNINGLANGUAGE:
        return "Learning Langauge";
      case UserObjectType.CATEGORY:
        return "Category";
      case UserObjectType.WORD:
      default:
        return "Word";
    }
  };
  return (
    <div className="filesDataSection">
      {data?.map((file, index) => {
        return (
           <div  className="filesTypeItem" key={index}  onClick={()=>{ naviagte(`/files/more/${file?._id}`)}}>
            <div>
              <p className="filesTypeLabel">{getFilesTypeLabel(file?.usedObjectType)}</p>
              <p className="filesUsedObj">Used Object</p>
            </div>
            {loading ? <CustomSpin size={73} color={Colors.GRAY_COLOR} /> : <img alt="img" className="fileIcon" src={getFilesTypeIcon(file?.type, file?._id)} />}
          </div>
        )
      })}
    </div>
  )
}
const FileFilterPopover = ({
  onChangeFileType,
  onChangeUserObj,
  userObj,
  file,
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

        <p className="popeverTitle">File Type</p>
        <Radio.Group onChange={onChangeFileType} value={file}>
          <div className="statusGroup">
            {fileTypes?.map((option) => {
              return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
            })}
          </div>
        </Radio.Group>
        <hr className="poepverHr" />
        <p className="popeverTitle">Used Objects</p>

        <Radio.Group onChange={onChangeUserObj} value={userObj}>
          <div className="statusGroup">
            {fileUsedObj?.map((option) => {
              return <Radio key={option.key} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
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
export const FilesScreen = () => {
  const { t } = useTranslation();
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const filesResponse = useSelector(getfilesGetResponse)?.data;
  const filesLoading = useSelector(getfilesGetloading);
  const [filtterSsubscribe, setFiltterSsubscribe] = useState(undefined);
  const [file, setSubscribe] = useState();
  const [filtterPhone, setFiltterPhone] = useState(undefined);
  const [userObj, setPhone] = useState();
  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);
  const filesImageLoading = useSelector(getfilesGetIdloading);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setSearchFilter(e.target.value)
      let data = {
        skip: 0,
        limit: listItemCountForShow,
        search: e.target.value
      }
      dispatch(filesGetThunk(data));
    } else {
      dispatch(filesGetThunk(ConstPagiantion(0, listItemCountForShow)));
      setSearchFilter(undefined)
    }
  }
  const onChangeFileType = (e) => {
    setSubscribe(e.target.value);
    if (e.target.value !== fileTypes.All) {
      setFiltterSsubscribe(e.target.value)
    } else {
      setFiltterSsubscribe(undefined)
    }
  };

  const onChangeUserObj = (e) => {
    setPhone(e.target.value);
    if (e.target.value !== fileUsedObj.All) {
      setFiltterPhone(e.target.value)
    } else {
      setFiltterPhone(undefined)
    }
  };

  const fetchData = useCallback(() => {
    dispatch(filesGetThunk(ConstPagiantion(0, listItemCountForShow)));
  }, [dispatch]);

  const fetchFilteredData = useCallback(() => {
    const filterData = {
      skip: 0,
      limit: listItemCountForShow,
      mediaType: filtterSsubscribe,
      usedObjectType: filtterPhone,
      search: searchFilter
    };
    dispatch(filesGetThunk(filterData));
  }, [dispatch, filtterSsubscribe, filtterPhone, searchFilter]);

  const handlePopoverOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const onChangePagination = (current) => {
    const skip = (current - 1) * listItemCountForShow;
    dispatch(filesGetThunk(ConstPagiantion(skip, listItemCountForShow)));
  };

  const handleClearFilter = () => {
    setSubscribe("")
    setPhone("")
    fetchData()
  };
  
  const handleApplyFilter = () => {
    fetchFilteredData();
  };
  
  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (categoryImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
      }));
    }
  }, [categoryImageResponse]);

  useEffect(() => {
    // Preload image URLs
    if (filesResponse?.list?.length) {
      filesResponse?.list.forEach((item) => {
        fetchImage(item._id);
      });
    }
  }, [filesResponse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <p className="filesTitle">File</p>
        <div className="filterDiv">
          <FileFilterPopover
            file={file}
            userObj={userObj}
            onChangeUserObj={onChangeUserObj}
            onChangeFileType={onChangeFileType}
            onClearFilter={handleClearFilter}
            onApplyFilter={handleApplyFilter}
            isPopoverOpen={isPopoverOpen}
            handlePopoverOpenChange={handlePopoverOpenChange}
          />
          <CustomSearchInput searchValue={searchValue} onChangeSearch={onChangeSearch} setSearchValue={setSearchValue} />
        </div>
        {!filesResponse?.list?.length && !filesLoading ? (
          <CustomNoData />
        ) : filesLoading ? (
          <div className="nativeLanguageScreenMainDiv">
            <CustomSpin size={64} color="gray" />
          </div>
        ) :
          <FilesItem naviagte={naviagte} loading={filesImageLoading} setImageUrls={setImageUrls} imageUrls={imageUrls} data={filesResponse?.list} />}
      </div>
      <div className="category-pagination">
        <CustomPagination length={filesResponse?.total} pageLength={listItemCountForShow} onChange={onChangePagination} />
      </div>
    </div>
  );
};
