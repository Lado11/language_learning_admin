import React, { useEffect } from "react";
import { Colors } from "../../assets/colors/colors";
import { useTranslation } from "react-i18next";
import "./feedback-screen-style.css";
import { CustomPagination, CustomSpin } from "../../components";
import { columnsFeedback } from "../../data";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { useDispatch, useSelector } from "react-redux";
import { feedBackGetThunk,  getFeedBackLoading,  getFeedBackResponse } from "../../store/slices/feedBack/get-feedback";

export const FeedbackScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const feedBackLoading = useSelector(getFeedBackLoading);
  const getFeedBackRespone = useSelector(getFeedBackResponse);
  const data = {
    skip: 0,
    limit: 6,
  };
  useEffect(() => {
    dispatch(feedBackGetThunk(data))
  }, [])

  const feedBackUpdate = (id) => {
    // localStorage.setItem("userId", id);
    // dispatch(userGetByIdThunk(id));
    // navigate("/user-update");
  }

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <p className="feedbackTitle">{t("FEEDBACK")}</p>
        {feedBackLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div> : <div class="container">
          <ul class="responsive-table">
            <TableHeader data={columnsFeedback} />
            {getFeedBackRespone?.data?.list?.map((val, index) => {
              return (
                <li class="table-row" key={index} onClick={() => {
                  feedBackUpdate(val?._id)
                }}>
                  <div class="col col-1 desc" data-label="Job Id">Word Mistake</div>
                  <div class="col col-1 desc" data-label="Job Id">Pending</div>
                  <div class="col col-1 desc" data-label="Job Id">12/12/24 12:25</div>
                  <div class="col col-1 desc" data-label="Job Id">12/12/24 12:25</div>
                  {/* <div class="col col-1 desc" data-label="Job Id">{val?.firstName}</div>
                  <div class="col col-1 desc" data-label="Job Id">{val?.phoneNumber}</div>
                  <div class="col col-1 desc buttonCol" data-label="Job Id"><p className="titleCol">{(val?.isSubscribed).toString()}</p></div> */}
                </li>
              )
            })}
          </ul>
        </div>}
      </div>
      <div className="nativeScreenPaginationDiv">
        <CustomPagination length={getFeedBackRespone?.data?.total} />
      </div>
      {/* <FeedbackScreenCardItem /> */}
    </div>
    // </div>
  );
};
