import React, { useState, useEffect } from "react";
import "./words-screen-style.css";
import { Colors } from "../../assets/colors";
import { CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { useTranslation } from "react-i18next";
import { WordsScreenAddFields, WordsScreenSelects } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsThunk,
  wordsLoadingData,
  wordsResponseData,
} from "../../store/slices";
import { customTableColumns } from "../../data";
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import { getIdWordsThunk } from "../../store/slices/words/getId-words";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";

export const WordsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
  const [wordsNativeLanguageSelectValue, setWordsNativeLanguageSelectValue] = useState();
  const [wordsLevelSelectedValue, setWordsLevelSelectedValue] = useState();
  const [wordsCategorySelecteValue, setWordsCategorySelectValue] = useState();
  const [searchValue, setSearchValue] = useState();
  const wordsResponse = useSelector(wordsResponseData);
  const wordsLoading = useSelector(wordsLoadingData);
  const updateWords = (id) => {
    localStorage.setItem("wordId", id)
    navigate(`/update-word/:${id}`)
    dispatch(getIdWordsThunk(id));
  }

  useEffect(() => {
    const data = {
      skip: 0,
      limit: 5,
      language: learningLanguageWordSelectedValue?._id ?
        learningLanguageWordSelectedValue?._id : "",
      level: wordsLevelSelectedValue?.value ? wordsLevelSelectedValue?.value : "",
      category: wordsCategorySelecteValue?._id ? wordsCategorySelecteValue?._id : "",
      translateLanguage: wordsNativeLanguageSelectValue?._id ? wordsNativeLanguageSelectValue?._id : "",
      search: searchValue ? searchValue : ""
    };
    dispatch(getWordsThunk(data));
  }, []);

  return (
    <div
      className="screensMainDiv wordsScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <WordsScreenAddFields />
        <p className="wordsScreenTitle">{t("WORDS")}</p>
        <WordsScreenSelects
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setWordsCategorySelectValue={setWordsCategorySelectValue}
          setWordsLevelSelectedValue={setWordsLevelSelectedValue}
          setWordsNativeLanguageSelectValue={setWordsNativeLanguageSelectValue}
          setLearningLanguageWordSelectedValue={setLearningLanguageWordSelectedValue}
          wordsCategorySelecteValue={wordsCategorySelecteValue}
          wordsLevelSelectedValue={wordsLevelSelectedValue}
          wordsNativeLanguageSelectValue={wordsNativeLanguageSelectValue}
          learningLanguageWordSelectedValue={learningLanguageWordSelectedValue}
        />
        <div className="wordsScreenTable">
          <div class="container">
            <ul class="responsive-table">
              <TableHeader data={customTableColumns} />
              {wordsLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
              </div> :
                <>
                  {!wordsResponse?.data?.list?.length && !wordsLoading ? <CustomNoData /> : wordsResponse?.data?.list?.map((val, index) => {
                    return (
                      <li class="table-row" key={val._id} onClick={() => {
                        updateWords(val?._id)
                      }}>
                        <div class="col col-1 desc" data-label="Job Id">{val?.word}</div>
                        <div class="col col-1 desc" data-label="Job Id">{val?.language?.name}</div>
                        <div class="col col-1 desc" data-label="Job Id">
                          <Avatar.Group
                            maxCount={4}
                            maxStyle={{
                              color: '#f56a00',
                              backgroundColor: '#fde3cf',
                            }}
                          >
                            {val?.translates.map((item, index) => {
                              return <div key={index}>
                                <Avatar src={item?.nativeLanguageDetails?.imageFile} />
                              </div>
                            })}
                          </Avatar.Group>
                        </div>
                        <div class="col col-1 desc" data-label="Job Id">{val?.transcription}</div>
                        <div class="col col-1 desc" data-label="Job Id">{val?.level === 0 ? "beginner" : val?.level === 1 ? "intermediate" : val?.level === 2 ? "advanced" : null}</div>
                        <div class="col col-1 desc buttonCol" data-label="Job Id"><p className="titleCol">{(val?.active).toString()}</p></div>
                      </li>
                    )
                  }
                  )}
                </>}
            </ul>
            {!wordsResponse?.data?.list?.length && !wordsLoading ? null : <div className="nativeScreenPaginationDiv">
              <CustomPagination length={wordsResponse?.data?.total} pageLength={5} />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};
