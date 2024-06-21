import React, { useEffect, useState } from "react";
import { Colors } from "../../assets/colors/colors";
import { useTranslation } from "react-i18next";
import "./feedback-screen-style.css";
import { CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { columnsFeedback, statusFeadback, typeFeadback } from "../../data";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { useDispatch, useSelector } from "react-redux";
import { feedBackGetThunk, getFeedBackLoading, getFeedBackResponse } from "../../store/slices/feedBack/get-feedback";
import word from "../../assets/images/word.png";
import app from "../../assets/images/app.png";
import general from "../../assets/images/general.png"
import { useNavigate } from "react-router-dom";
import { feedBackGetIdThunk } from "../../store/slices/feedBack/getId-feadback";
import filterIcon from "../../assets/images/filterIcon.png"
import { Popover, Radio } from "antd";


export const FeedbackScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedBackLoading = useSelector(getFeedBackLoading);
  const getFeedBackRespone = useSelector(getFeedBackResponse);
  const [open, setOpen] = useState(false);
  const hide = () => {
      setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
  };
  

  const [value, setValue] = useState();
  const onChange = (e) => {
      setValue(e.target.value);
  };
  const [valueType, setValueType] = useState();
  const onChangeType = (e) => {
      setValueType(e.target.value);
  };


  const data = {
    skip: 0,
    limit: 6,
  };
  useEffect(() => {
    dispatch(feedBackGetThunk(data))
  }, [])

  const feedBack = (id) => {
    localStorage.setItem("feadback", id);
    dispatch(feedBackGetIdThunk(id));
    navigate(`/feadback/${id}`);
  }

const clearFilter = () => {
  setValue("")
  setValueType("")
  const data = {
    skip: 0,
    limit: 6,
    type:2,
    status:2
  }
  dispatch(feedBackGetThunk(data))
}

  const sendFilter = () => {
    const data = {
      skip: 0,
      limit: 6,
      type:value-1,
      status:valueType-1,
    }
    dispatch(feedBackGetThunk(data))
  }

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <p className="feedbackTitle">{t("FEEDBACK")}</p>
        <Popover
                    placement="bottomLeft"
                    content={<div className="filterSection">
                        <p className="popeverTitle">Feedback Type</p>
                        <Radio.Group onChange={onChange} value={value}>
                            <div className="statusGroup">
                                {typeFeadback?.map((option) => {
                                    return <Radio  className="radio" value={option.key}>{option.title}</Radio>
                                })}
                            </div>
                        </Radio.Group>
                        <hr className="poepverHr" />
                        <p  className="popeverTitle">Status</p>

                        <Radio.Group onChange={onChangeType} value={valueType}>
                            <div className="statusGroup">
                                {statusFeadback?.map((option) => {
                                    return <Radio  className="radio" value={option.key}>{option.title}</Radio>
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
                    <img src={filterIcon} className="popeverOpenImg" />
                </Popover>
        <div class="container">
          <ul class="responsive-table">
            <TableHeader data={columnsFeedback} />
            {feedBackLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
              <CustomSpin size={64} color="gray" />
            </div> : !getFeedBackRespone?.data?.list?.length && !feedBackLoading ? <CustomNoData /> :
              getFeedBackRespone?.data?.list?.map((val, index) => {
                return (
                  <li class="table-row" key={index} onClick={() => {
                    feedBack(val?._id)
                  }}>
                    <div class="col col-1 desc" data-label="Job Id">{val?.type === 0 ?
                      <div className="rowFeadback">
                        <img src={word} className="iconfeadback" />
                        <p className="feadbackItem">Word Mistake</p>
                      </div>
                      : val?.type === 1 ?
                        <div className="rowFeadback">
                          <img src={app} className="iconfeadback" />
                          <p className="feadbackItem">App Issue</p>
                        </div>
                        :
                        <div className="rowFeadback">
                          <img src={general} className="iconfeadback" />
                          <p className="feadbackItem">General Mistake</p>
                        </div>
                    }</div>
                    <div class="col col-1 desc" data-label="Job Id">{val?.status === 0 ? <p className="feadbackItem">Pending</p> : val?.status === 1 ? <p className="feadbackItem">Resolved</p> : <p className="feadbackItem">Canceled</p>}</div>
                    <div class="col col-1 desc" data-label="Job Id">{val?.updateDt}</div>
                    <div class="col col-1 desc" data-label="Job Id">{val?.createDt}</div>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
      {!getFeedBackRespone?.data?.list?.length && !feedBackLoading ? null : <div className="nativeScreenPaginationDiv">
        <CustomPagination length={getFeedBackRespone?.data?.total} pageLength={12} />
      </div>}
    </div>
  );
};
