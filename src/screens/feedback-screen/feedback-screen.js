import wordIcon from "../../assets/images/word.png";
import appIcon from "../../assets/images/app.png";
import generalIcon from "../../assets/images/general.png";
import filterIcon from "../../assets/images/filterIcon.png";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedBackGetIdThunk } from "../../store/slices/feedBack/getId-feadback";
import { Popover, Radio } from "antd";
import { Colors } from "../../assets/colors/colors";
import "./feedback-screen-style.css";
import { FeedbackStatus, FeedbackType} from "./feadback-typing"
import { columnsFeedback, statusFeadback, typeFeadback } from "./feedback-data";
import { feedBackGetThunk, getFeedBackLoading, getFeedBackResponse } from "../../store/slices/feedBack/get-feedback";
import { listItemCountForShow } from "../../constants/constants";
import { ConstPagiantion } from "../../constants/const-pagination";


const FeedbackFilterPopover = ({
  currentType,
  currentStatus,
  onTypeChange,
  onStatusChange,
  onClearFilter,
  onApplyFilter,
  isPopoverOpen,
  handlePopoverOpenChange,
}) => {
  const { t } = useTranslation();

  return (
    <Popover
      placement="bottomLeft"
      content={
        <div className="filterSection">
          <p className="popeverTitle">{t("Feedback Type")}</p>
          <Radio.Group onChange={onTypeChange} value={currentType}>
            <div className="statusGroup">
              {typeFeadback?.map((option) => (
                <Radio key={option.key} className="radio" value={option.key}>
                  <p className="optiontitle">{option.title}</p>
                </Radio>
              ))}
            </div>
          </Radio.Group>
          <hr className="poepverHr" />
          <p className="popeverTitle">{t("Status")}</p>
          <Radio.Group onChange={onStatusChange} value={currentStatus}>
            <div className="statusGroup">
              {statusFeadback?.map((option) => (
                <Radio key={option.key} className="radio" value={option.key}>
                  <p className="optiontitle">{option.title}</p>
                </Radio>
              ))}
            </div>
          </Radio.Group>
          <div className="buttonSection">
            <button onClick={onClearFilter} className="button">
              {t("Clear")}
            </button>
            <button onClick={onApplyFilter} className="buttonApply">
              {t("Apply")}
            </button>
          </div>
        </div>
      }
      trigger="click"
      open={isPopoverOpen}
      onOpenChange={handlePopoverOpenChange}
    >
      <div className="fiterlIconSection">
      <img src={filterIcon} className="popeverOpenImg" alt="Filter Icon" />

      </div>
    </Popover>
  );
};

const FeedbackListItem = ({ feedback, onClick }) => {
  const getFeedbackTypeIcon = (type) => {
    switch (type) {
      case FeedbackType.WORD_MISTAKE:
        return wordIcon;
      case FeedbackType.APP_ISSUE:
        return appIcon;
      case FeedbackType.GENERAL_FEEDBACK:
      default:
        return generalIcon;
    }
  };

  const getFeedbackTypeLabel = (type) => {
    switch (type) {
      case FeedbackType.WORD_MISTAKE:
        return "Word Mistake";
      case FeedbackType.APP_ISSUE:
        return "App Issue";
      case FeedbackType.GENERAL_FEEDBACK:
      default:
        return "General Mistake";
    }
  };

  const getFeedbackStatusLabel = (status) => {
    switch (status) {
      case FeedbackStatus.PENDING:
        return "Pending";
      case FeedbackStatus.RESOLVED:
        return "Resolved";
      case FeedbackStatus.CANCELED:
      default:
        return "Canceled";
    }
  };

  return (
    <li className="table-row" onClick={onClick}>
      <div className="col col-1 desc" data-label="Job Id">
        <div className="rowFeadback">
          <img src={getFeedbackTypeIcon(feedback?.type)} className="iconfeadback" alt="Icon" />
          <p className="feadbackItem">{getFeedbackTypeLabel(feedback?.type)}</p>
        </div>
      </div>
      <div className="col col-1 desc" data-label="Job Id">
        <p className="feadbackItem">{getFeedbackStatusLabel(feedback?.status)}</p>
      </div>
      <div className="col col-1 desc" data-label="Job Id">
        {feedback?.updateDt}
      </div>
      <div className="col col-1 desc" data-label="Job Id">
        {feedback?.createDt}
      </div>
    </li>
  );
};

export const FeedbackScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedBackLoading = useSelector(getFeedBackLoading);
  const feedBackResponse = useSelector(getFeedBackResponse);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [filterType, setFilterType] = useState(undefined);
  const [currentFilterType, setCurrentFilterType] = useState();
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [currentStatus, setCurrentStatus] = useState();

  const fetchData = useCallback(() => {
    dispatch(feedBackGetThunk(ConstPagiantion(0, listItemCountForShow)));
  }, [dispatch]);

  const fetchFilteredData = useCallback(() => {
    const filterData = {
      skip: 0,
      limit: listItemCountForShow,
      type: filterType,
      status: filterStatus,
    };
    dispatch(feedBackGetThunk(filterData));
  }, [dispatch, filterType, filterStatus]);

  const handlePopoverOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const handleTypeChange = (e) => {
    setCurrentFilterType(e.target.value);
    setFilterType(e.target.value !== FeedbackType.All ? e.target.value : undefined);
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);
    setFilterStatus(e.target.value !== FeedbackStatus.All ? e.target.value : undefined);
  };

  const handleFeedbackClick = (id) => {
    dispatch(feedBackGetIdThunk(id));
    navigate(`/feadback/${id}`);
  };

  const handleClearFilter = () => {
    setCurrentFilterType("");
    setCurrentStatus("");
    setFilterType(undefined);
    setFilterStatus(undefined);
    fetchData()
    // fetchFilteredData();
  };

  const handleApplyFilter = () => {
    fetchFilteredData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="nativeLanguageScreenMainDiv" style={{ backgroundColor: Colors.WHITE }}>
      <div>
        <p className="feedbackTitle">{t("FEEDBACK")}</p>
        <FeedbackFilterPopover
          currentType={currentFilterType}
          currentStatus={currentStatus}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
          onClearFilter={handleClearFilter}
          onApplyFilter={handleApplyFilter}
          isPopoverOpen={isPopoverOpen}
          handlePopoverOpenChange={handlePopoverOpenChange}
        />
        <div className="container">
          <ul className="responsive-table">
            <TableHeader data={columnsFeedback} />
            {feedBackLoading ? (
              <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
              </div>
            ) : !feedBackResponse?.data?.list?.length && !feedBackLoading ? (
              <CustomNoData />
            ) : (
              feedBackResponse?.data?.list?.map((feedback, index) => (
                <FeedbackListItem
                  key={index}
                  feedback={feedback}
                  onClick={() => handleFeedbackClick(feedback?._id)}
                />
              ))
            )}
          </ul>
        </div>
      </div>
      {!feedBackResponse?.data?.list?.length && !feedBackLoading ? null : (
        <div className="nativeScreenPaginationDiv">
          <CustomPagination length={feedBackResponse?.data?.total} pageLength={listItemCountForShow} />
        </div>
      )}
    </div>
  );
};
