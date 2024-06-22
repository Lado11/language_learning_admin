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
import { WordsLevel, customTableColumns, level } from "../../data";
import { Avatar, Popover, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { getIdWordsThunk } from "../../store/slices/words/getId-words";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filterIcon.png"

export const WordsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const wordsResponse = useSelector(wordsResponseData);
  const wordsLoading = useSelector(wordsLoadingData);
  const learningLanguagesData = useSelector(learningLanguages)?.data?.list;
  const nativeLanguageData = useSelector(getNativeGetResponse)?.data?.list
  const categoryData = useSelector(getCategoryGetData)?.data?.list
  const [open, setOpen] = useState(false);


  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setSearchFilter(e.target.value)
      let data = {
        skip: 0,
        limit: 5,
        search: e.target.value
      }
      dispatch(getWordsThunk(data));

    } else {
      let data = {
        skip: 0,
        limit: 5,
      }
      dispatch(getWordsThunk(data));
      setSearchFilter(undefined)
    }
  }
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
  const [valueCategory, setValueCategor] = useState();
  const onChangeCategory = (e) => {
    setValueCategor(e.target.value);
  };

  const [valueLevel, setValueLevel] = useState();
  const [filterLevel, setFilterLevel] = useState(undefined);

  const onChangeLevel = (e) => {
    console.log(e.target.value, "val");
    setValueLevel(e.target.value);
    if (e.target.value !== WordsLevel.All) {
      setFilterLevel(e.target.value)
    } else {
      setFilterLevel(undefined)
    }
  };

  const updateWords = (id) => {
    localStorage.setItem("wordId", id)
    navigate(`/words/${id}`)
    dispatch(getIdWordsThunk(id));
  }

  useEffect(() => {
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

  const filterData = {
    skip: 0,
    limit: 6,
    language: value,
    level: filterLevel,
    category: valueCategory,
    translateLanguage: valueType,
  }

  const clearFilter = () => {
    setValue()
    setValueCategor()
    setValueLevel()
    setFilterLevel()
    setValueType()
    dispatch(getWordsThunk(data))
  }

  const sendFilter = () => {
    dispatch(getWordsThunk(filterData))
  }

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

                  <Radio.Group key={1} onChange={onChange} value={value}>
                    <div className="statusGroupWords">
                      {learningLanguagesData?.map((option) => {
                        return <Radio className="radio" key={option?.key} value={option?._id}><p className="optiontitle">{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</p></Radio>
                      })}
                    </div>
                  </Radio.Group>
                </div>
                <div className="radioItem">
                  <p className="popeverTitle">Neative Language</p>
                  <Radio.Group key={2} onChange={onChangeType} value={valueType}>
                    <div className="statusGroupWords">
                      {nativeLanguageData?.map((option) => {
                        return <Radio className="radio" key={option?.key} value={option?._id}><p className="optiontitle">{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</p></Radio>
                      })}
                    </div>
                  </Radio.Group>
                </div>
                <div className="radioItem">
                  <p className="popeverTitle">Category</p>
                  <Radio.Group onChange={onChangeCategory} value={valueCategory}>
                    <div className="statusGroupWords">
                      {categoryData?.map((option) => {
                        return <Radio className="radio" key={option?.key} value={option?._id}><p className="optiontitle">{option?.localization?.length > 10 ? (option?.localization)?.slice(0, 10) + "..." : option?.localization}</p></Radio>
                      })}
                    </div>
                  </Radio.Group>
                </div>
              </div>

              <hr className="poepverHr" />
              <p className="popeverTitle">Level</p>

              <Radio.Group onChange={onChangeLevel} value={valueLevel}>
                <div className="statusGroup">
                  {level?.map((option) => {
                    return <Radio className="radio" key={option?.key} value={option?.key}><p className="optiontitle">{option.title}</p></Radio>
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
          <CustomSearchInput searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearch={onChangeSearch} />
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
          <div className="container">
            <ul className="responsive-table">
              <TableHeader data={customTableColumns} />
              {wordsLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
              </div> :
                <>
                  {!wordsResponse?.data?.list?.length && !wordsLoading ? <CustomNoData /> : wordsResponse?.data?.list?.map((val, index) => {
                    return (
                      <li className="table-row" key={val._id} onClick={() => {
                        updateWords(val?._id)
                      }}>
                        <div className="col col-1 desc" data-label="Job Id">{val?.word}</div>
                        <div className="col col-1 desc" data-label="Job Id">{val?.language?.name}</div>
                        <div className="col col-1 desc" data-label="Job Id">
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
                        <div className="col col-1 desc" data-label="Job Id">{val?.transcription}</div>
                        <div className="col col-1 desc" data-label="Job Id">{val?.level === 0 ? "beginner" : val?.level === 1 ? "intermediate" : val?.level === 2 ? "advanced" : null}</div>
                        <div className="col col-1 desc buttonCol" data-label="Job Id"><p className="titleCol">{(val?.active).toString()}</p></div>
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
