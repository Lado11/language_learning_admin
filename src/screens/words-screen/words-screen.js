import React, { useState, useEffect } from "react";
import "./words-screen-style.css";
import { Colors } from "../../assets/colors";
import { CustomNoData, CustomPagination, CustomSearchInput, CustomSpin } from "../../components";
import { useTranslation } from "react-i18next";
import { WordsScreenAddFields } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryGetThunk,
  getCategoryGetData,
  getNativeGetResponse,
  getWordsThunk,
  learningLanguages,
  learningLanguagesThunk,
  nativeLanguageGetThunk,
  wordsLoadingData,
  wordsResponseData,
} from "../../store/slices";
import { customTableColumns, level } from "../../data";
import { Avatar, Popover, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { getIdWordsThunk } from "../../store/slices/words/getId-words";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filterIcon.png"

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
  const learningLanguagesData = useSelector(learningLanguages)?.data?.list;
  const nativeLanguageData = useSelector(getNativeGetResponse)?.data?.list
  const categoryData = useSelector(getCategoryGetData)?.data?.list
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [valueType, setValueType] = useState(1);
  const onChangeType = (e) => {
    setValueType(e.target.value);
  };

  const updateWords = (id) => {
    localStorage.setItem("wordId", id)
    navigate(`/words/${id}`)
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

  const data = {
    skip: 0,
    limit: 12,
  };
  useEffect(() => {
    dispatch(learningLanguagesThunk(data));
    dispatch(nativeLanguageGetThunk(data));
    dispatch(categoryGetThunk(data));
  }, []);


  return (
    <div
      className="screensMainDiv nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <WordsScreenAddFields />
        <p className="wordsScreenTitle">{t("WORDS")}</p>
       <div className="filterDiv"> 
       <Popover
          placement="bottomLeft"
          content={<div className="filterSection">
            <div className="radioRowSection">
              <div className="radioItem">
                <p className="popeverTitle">Learning Language</p>
                
                <Radio.Group onChange={onChange} value={value}>
                  <div className="statusGroupWords">
                    {learningLanguagesData?.map((option) => {
                      return <Radio className="radio" value={option?._id}>{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</Radio>
                    })}
                  </div>
                </Radio.Group>
              </div>
              <div className="radioItem">
                <p className="popeverTitle">Neative Language</p>
                <Radio.Group onChange={onChange} value={value}>
                  <div className="statusGroupWords">
                    {nativeLanguageData?.map((option) => {
                      return <Radio className="radio" value={option?._id}>{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</Radio>
                    })}
                  </div>
                </Radio.Group>
              </div>
              <div className="radioItem">
                <p className="popeverTitle">Category</p>
                <Radio.Group onChange={onChange} value={value}>
                  <div className="statusGroupWords">
                    {categoryData?.map((option) => {
                      return <Radio className="radio" value={option?._id}>{option?.localization?.length > 10 ? (option?.localization)?.slice(0, 10) + "..." : option?.localization}</Radio>
                    })}
                  </div>
                </Radio.Group>
              </div>
            </div>

            <hr className="poepverHr" />
            <p className="popeverTitle">Level</p>

            <Radio.Group onChange={onChangeType} value={valueType}>
              <div className="statusGroup">
                {level?.map((option) => {
                  return <Radio className="radio" value={option.key}>{option.title}</Radio>
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
        <CustomSearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
       </div>
        {/* <WordsScreenSelects
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
        /> */}
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
