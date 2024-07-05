import React, { useState, useEffect, useCallback } from "react";
import "./words-screen-style.css";
import { Colors } from "../../assets/colors";
import { CustomNoData, CustomPagination, CustomSearchInput, CustomSpin } from "../../components";
import { useTranslation } from "react-i18next";
import { WordsScreenAddFields } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryGetThunk,
  getCategoryGetData,
  getCategoryGetLoading,
  getLearnLanguagesLoading,
  getNativeGetResponse,
  getNativeGetloading,
  getWordsThunk,
  learningLanguages,
  learningLanguagesThunk,
  nativeLanguageGetThunk,
  wordsLoadingData,
  wordsResponseData,
} from "../../store/slices";
import { Popover, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { getIdWordsThunk } from "../../store/slices/words/getId-words";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filterIcon.png"
import { listItemCountForShow, } from "../../constants/constants";
import { ConstPagiantion } from "../../constants/const-pagination";
import { WordsLevelData, tableHeaderData } from "./words-data";
import { WordsLevel, WordsStatus } from "./words-typing";
import InfiniteScroll from "react-infinite-scroll-component";


// Custom hook to manage three pieces of state dynamically
const useDynamicState = (initialValue1, initialValue2, initialValue3, getDataCallback) => {
  const [learningState, setLearningState] = useState(initialValue1);
  const [nativeState, setNativeState] = useState(initialValue2);
  const [categoryState, setCategoryState] = useState(initialValue3);
  const dispatch = useDispatch()

  const updateState = (index, value) => {
    switch (index) {
      case 1:
        setLearningState(value);
        break;
      case 2:
        setNativeState(value);
        break;
      case 3:
        setCategoryState(value);
        break;
      default:
        break;
    }
  };

  const getState = (index) => {
    switch (index) {
      case 1:
        return learningState;
      case 2:
        return nativeState;
      case 3:
        return categoryState;
      default:
        return undefined;
    }
  };

  const onChangeState = (index, value) => {
    if (index === 2) {
      let data = {
        skip: 0,
        limit: listItemCountForShow,
        search: value.length ? value : undefined
      }
      dispatch(nativeLanguageGetThunk(data));

    } else if (index === 1) {
      let data = {
        skip: 0,
        limit: listItemCountForShow,
        search: value.length ? value : undefined
      }
      dispatch(learningLanguagesThunk(data));

    } else if (index === 3) {
      let data = {
        skip: 0,
        limit: listItemCountForShow,
        search: value.length ? value : undefined
      }
      dispatch(categoryGetThunk(data));
    }
    updateState(index, value);

    // Example of handling state changes and triggering data fetch/callback
    if (getDataCallback) {
      getDataCallback({
        learningState,
        nativeState,
        categoryState
      });
    }
  };

  return {
    learningState,
    nativeState,
    categoryState,
    onChangeState,
    getState
  };
};


const WordsFilterPopover = ({
  nativeLoading,
  categoryData,
  valueLevel,
  categoryLoading,
  nativeLanguageData,
  learningLanguagesData,
  onChangeLevel,
  nativeLanguage,
  lerningLanguage,
  onChangeCategory,
  onChangeLerningLanguage,
  onChangeNativeLanguage,
  valueCategory,
  onClearFilter,
  onApplyFilter,
  isPopoverOpen,
  handlePopoverOpenChange,
  searchValue,
  setSearchValue
}) => {
  const { t } = useTranslation();
  const { learningState, nativeState, categoryState, onChangeState } = useDynamicState('', '', '',);

  const dispatch = useDispatch();
  const [skip, setPage] = useState(1);
  const languageLoading = useSelector(getLearnLanguagesLoading)

  const fetchData = () => {
    const data = {
      skip: skip,
      limit: skip * listItemCountForShow
    }
    dispatch(learningLanguagesThunk(data));
  };

  const fetchDataNative = () => {
    const data = {
      skip: skip,
      limit: skip * listItemCountForShow
    }
    dispatch(nativeLanguageGetThunk(data));
  };

  const fetchDataCategory = () => {
    const data = {
      skip: skip,
      limit: skip * listItemCountForShow
    }
    dispatch(categoryGetThunk(data));
  };

  useEffect(() => {
    fetchData();
    fetchDataCategory()
    fetchDataNative()
  }, [skip]); // Вызывать fetchData при изменении page

  const handleNext = () => {
    setPage(skip + 1); // Увеличиваем номер страницы для следующей загрузки данных
  };

  return (
    <Popover
      placement="bottomLeft"
      content={<div className="filterSection">
        <div className="radioRowSection">

          <div className="radioItem">
            <p className="popeverTitle">Learning Language</p>
            <div className="filterSearch">
              <CustomSearchInput plaseholder="Search" searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearch={(e) => onChangeState(1, e.target.value)} />
            </div>
            <div className="radioListItem" id="scrollableDiv">
              <InfiniteScroll
                scrollableTarget="scrollableDiv"
                dataLength={learningLanguagesData?.length || 0}
                next={handleNext}
                hasMore={languageLoading}
                loader={languageLoading ? <div><CustomSpin size={14} color={Colors.GRAY_COLOR} /></div> : null}
              >
                <Radio.Group key={1} onChange={onChangeLerningLanguage} value={lerningLanguage}>
                  <div className="statusGroupWords">
                    {learningLanguagesData?.map((option) => {
                      return <Radio className="radio" key={option?._id} value={option?._id}><p className="optiontitle">{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</p></Radio>
                    })}
                  </div>
                </Radio.Group>
              </InfiniteScroll>
            </div>
          </div>

          <div className="radioItem">
            <p className="popeverTitle">Neative Language</p>
            <div className="filterSearch"   >
              <CustomSearchInput plaseholder="Search" searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearch={(e) => onChangeState(2, e.target.value)} />
            </div>
            <div className="radioListItem" id="scrollableDivNative">

              <InfiniteScroll
                scrollableTarget="scrollableDivNative"
                dataLength={nativeLanguageData?.length || 0}
                next={handleNext}
                hasMore={nativeLoading}
                loader={nativeLoading ? <div><CustomSpin size={14} color={Colors.GRAY_COLOR} /></div> : null}
              >

                <Radio.Group key={2} onChange={onChangeNativeLanguage} value={nativeLanguage} >
                  <div className="statusGroupWords">
                    {nativeLanguageData?.map((option) => {
                      return <Radio className="radio" key={option?._id} value={option?._id}><p className="optiontitle">{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</p></Radio>
                    })}
                  </div>
                </Radio.Group>
              </InfiniteScroll>
            </div>
          </div>



          <div className="radioItem">
            <p className="popeverTitle">Category</p>
            <div className="filterSearch">
              <CustomSearchInput plaseholder="Search" searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearch={(e) => onChangeState(3, e.target.value)} />
            </div>
            <div className="radioListItem" id="scrollableDivCategory">
              <InfiniteScroll
                scrollableTarget="scrollableDivCategory"
                dataLength={categoryData?.length || 0}
                next={handleNext}
                hasMore={categoryLoading}
                loader={categoryLoading ? <div><CustomSpin size={14} color={Colors.GRAY_COLOR} /></div> : null}
              >
                <Radio.Group key={3} onChange={onChangeCategory} value={valueCategory}>
                  <div className="statusGroupWords">
                    {categoryData?.map((option) => {
                      return <Radio className="radio" key={option?._id} value={option?._id}><p className="optiontitle">{option?.localization?.length > 10 ? (option?.localization)?.slice(0, 10) + "..." : option?.localization}</p></Radio>
                    })}
                  </div>
                </Radio.Group>
              </InfiniteScroll>

            </div>
          </div>
        </div>

        <hr className="poepverHr" />
        <p className="popeverTitle">Level</p>

        <Radio.Group key={4} onChange={onChangeLevel} value={valueLevel}>
          <div className="statusGroup">
            {WordsLevelData?.map((option) => {
              return <Radio className="radio" key={option?.key} value={option?.key}><p className="optiontitle">{option.title}</p></Radio>
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
const WordsListItem = ({ count, words, onClick, key }) => {
  const getWordsLevelLabel = (status) => {
    switch (status) {
      case WordsLevel.BEGINNER:
        return "beginner";
      case WordsLevel.INTERMIDATE:
        return "intermediate";
      case WordsLevel.ADVANCED:
      default:
        return "advanced";
    }
  };

  const getWordsStatusLabel = (status) => {
    switch (status) {
      case WordsStatus.ACTIVE:
        return "Active";
      case WordsStatus.INACTIVE:
      default:
        return "In active";
    }
  };

  return (
    <li className="table-row" key={key} onClick={onClick}>
      <div className="col col-1 desc" data-label="Job Id">{(words?.word.slice(0, 10))}</div>
      <div className="col col-1 desc" data-label="Job Id">{words?.language?.name}</div>
      <div className="col col-1 desc count" data-label="Job Id">
        <div className="wordsItemCount">
          {count}
        </div>
      </div>
      <div className="col col-1 desc" data-label="Job Id">{words?.transcription}</div>
      <div className="col col-1 desc" data-label="Job Id">
        {getWordsLevelLabel(words?.level)}
      </div>
      <div className="col col-1 desc buttonCol" data-label="Job Id">
        {getWordsStatusLabel(words?.status)}</div>
    </li>
  );
};


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
  const nativeLoading = useSelector(getNativeGetloading);
  const categoryData = useSelector(getCategoryGetData)?.data?.list
  const categoryLoading = useSelector(getCategoryGetLoading)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    const search = e.target.value

    if (e.target.value !== "" && e.target.value.length > 2) {
      setSearchFilter(e.target.value)
      fetchFilteredData(0,search)
    } else {
      fetchFilteredData(0,search)
      setSearchFilter(undefined)
    }
  }

  const onChangePagination = (current) => {
    const skip = (current - 1) * listItemCountForShow;
    fetchFilteredData(skip);
  };

  const [nativeLanguage, setNativeLanguage] = useState();
  const onChangeNativeLanguage = (e) => {
    setNativeLanguage(e.target.value);
  };

  const [lerningLanguage, setLerningLanguage] = useState();
  const onChangeLerningLanguage = (e) => {
    setLerningLanguage(e.target.value);
  };

  const [valueCategory, setValueCategor] = useState();
  const onChangeCategory = (e) => {
    setValueCategor(e.target.value);
  };

  const [valueLevel, setValueLevel] = useState();
  const [filterLevel, setFilterLevel] = useState(undefined);

  const onChangeLevel = (e) => {
    setValueLevel(e.target.value);
    if (e.target.value !== WordsLevel.All) {
      setFilterLevel(e.target.value)
    } else {
      setFilterLevel(undefined)
    }
  };


  const updateWords = (id) => {
    navigate(`/words/${id}`)
    dispatch(getIdWordsThunk(id));
  }


  const fetchData = useCallback(() => {
    dispatch(getWordsThunk(ConstPagiantion(0, listItemCountForShow)));
  }, [dispatch]);

  const fetchFilteredData = useCallback((skip = 0,search) => {
    console.log(search,"search");
    const filterData = {
      skip: skip,
      limit: listItemCountForShow,
      language: lerningLanguage,
      level: filterLevel,
      category: valueCategory,
      translateLanguage: nativeLanguage,
      search: search ? search : searchFilter
    };
    dispatch(getWordsThunk(filterData));
  }, [dispatch, lerningLanguage, filterLevel, valueCategory, nativeLanguage,searchFilter]);

  const handlePopoverOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const handleClearFilter = () => {
    setLerningLanguage()
    setValueCategor()
    setValueLevel()
    setFilterLevel()
    setNativeLanguage()
    fetchData()
  };

  const handleApplyFilter = () => {
    fetchFilteredData();
  };

  useEffect(() => {
    dispatch(learningLanguagesThunk(ConstPagiantion(0, listItemCountForShow)));
    dispatch(nativeLanguageGetThunk(ConstPagiantion(0, listItemCountForShow)));
    dispatch(categoryGetThunk(ConstPagiantion(0, listItemCountForShow)));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div
      className="screensMainDiv nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <WordsScreenAddFields />
        <p className="wordsScreenTitle">{t("WORDS")}</p>
        <div className="filterDiv">
          <WordsFilterPopover
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearch={onChangeSearch}
            valueLevel={valueLevel}
            nativeLoading={nativeLoading}
            categoryData={categoryData}
            categoryLoading={categoryLoading}
            nativeLanguageData={nativeLanguageData}
            learningLanguagesData={learningLanguagesData}
            nativeLanguage={nativeLanguage}
            lerningLanguage={lerningLanguage}
            onChangeLerningLanguage={onChangeLerningLanguage}
            onChangeNativeLanguage={onChangeNativeLanguage}
            onChangeCategory={onChangeCategory}
            onChangeLevel={onChangeLevel}
            valueCategory={valueCategory}
            onClearFilter={handleClearFilter}
            onApplyFilter={handleApplyFilter}
            isPopoverOpen={isPopoverOpen}
            handlePopoverOpenChange={handlePopoverOpenChange}
          />
          <CustomSearchInput plaseholder="Search ID, name, device ID, email, phone number"
            searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearch={onChangeSearch} />
        </div>

        <div className="wordsScreenTable">
          <div className="container">
            <ul className="responsive-table">
              <TableHeader data={tableHeaderData} />
              {wordsLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
              </div> :
                <>
                  {!wordsResponse?.data?.list?.length && !wordsLoading ?
                    <CustomNoData /> : wordsResponse?.data?.list?.map((words, index) => {
                      return (
                        <WordsListItem count={words?.translates?.length} words={words} onClick={() => updateWords(words?._id)} key={index} />
                      )
                    }
                    )}
                </>}
            </ul>
            {!wordsResponse?.data?.list?.length && !wordsLoading ? null : <div className="nativeScreenPaginationDiv">
              <CustomPagination length={wordsResponse?.data?.total} pageLength={listItemCountForShow} onChange={onChangePagination} />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};
