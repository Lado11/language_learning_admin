import React, { useState, useEffect } from "react";
import "./words-screen-style.css";
import { Colors } from "../../assets/colors";
import { CustomPagination, CustomSpin, CustomTable } from "../../components";
import { useTranslation } from "react-i18next";
import { WordsScreenAddFields, WordsScreenSelects } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsThunk,
  wordsLoadingData,
  wordsResponseData,
} from "../../store/slices";
import { columns, customTableColumns } from "../../data";

export const WordsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wordsResponse = useSelector(wordsResponseData);
  console.log(wordsResponse,"log")
  const wordsLoading = useSelector(wordsLoadingData);
  const pageLength = 12;

  useEffect(() => {
    const data = {
      skip: 0,
      limit: 12,
    };
    dispatch(getWordsThunk(data));
  }, []);

  return (
    <div
      className="screensMainDiv wordsScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <WordsScreenAddFields />
      <p className="wordsScreenTitle">{t("WORDS")}</p>
      <WordsScreenSelects />
      <div  className="wordsScreenTable">

      { <div class="container">
          <ul class="responsive-table">
            <li class="table-header">
              {customTableColumns?.map((item) => {
                return (
                  <div class="col col-1 label">{item?.title}</div>
                )
              })}
            </li>
            {!wordsResponse?.data?.list?.length &&   !wordsLoading ? <p>No Data</p> : null}
            {wordsLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
         <CustomSpin size={64} color="gray" /> 
         </div>: wordsResponse?.data?.list?.map((val, index) => {
              return (
                <li class="table-row" >
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

 
        {/* <CustomTable /> */}
      </div>
      <div className="wordsPagination">
        <CustomPagination pageLength={pageLength}/>
      </div>
    </div>
  );
};
