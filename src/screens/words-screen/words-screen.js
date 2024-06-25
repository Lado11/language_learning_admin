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
  getNativeGetResponse,
  getWordsThunk,
  learningLanguages,
  learningLanguagesThunk,
  nativeLanguageGetThunk,
  wordsLoadingData,
  wordsResponseData,
} from "../../store/slices";
import { WordsLevel, customTableColumns } from "../../data";
import { Avatar, Popover, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { getIdWordsThunk } from "../../store/slices/words/getId-words";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import filterIcon from "../../assets/images/filterIcon.png"
import { page0, page12, page5, page6 } from "../../constants/constants";
import { ConstPagiantion } from "../../constants/const-pagination";
import { WordsLevelData } from "./words-data";
import { WordsStatus } from "./words-typing";


const WordsFilterPopover = ({
  categoryData,
  valueLevel,
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
}) => {
  const { t } = useTranslation();

  return (
    <Popover
      placement="bottomLeft"
      content={<div className="filterSection">
        <div className="radioRowSection">
          <div className="radioItem">
            <p className="popeverTitle">Learning Language</p>

            <Radio.Group key={1} onChange={onChangeLerningLanguage} value={lerningLanguage}>
              <div className="statusGroupWords">
                {learningLanguagesData?.map((option) => {
                  return <Radio className="radio" key={option?.key} value={option?._id}><p className="optiontitle">{option?.name?.length > 10 ? (option?.name)?.slice(0, 10) + "..." : option?.name}</p></Radio>
                })}
              </div>
            </Radio.Group>
          </div>
          <div className="radioItem">
            <p className="popeverTitle">Neative Language</p>
            <Radio.Group key={2} onChange={onChangeNativeLanguage} value={nativeLanguage}>
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
const WordsListItem = ({ words, onClick, key }) => {
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
      <div className="col col-1 desc" data-label="Job Id">{words?.word}</div>
      <div className="col col-1 desc" data-label="Job Id">{words?.language?.name}</div>
      <div className="col col-1 desc" data-label="Job Id">
        <Avatar.Group
          maxCount={4}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          {words?.translates.map((item, index) => {
            return <div key={index}>
              <Avatar src={item?.nativeLanguageDetails?.imageFile} />
            </div>
          })}
        </Avatar.Group>
      </div>
      <div className="col col-1 desc" data-label="Job Id">{words?.transcription}</div>
      <div className="col col-1 desc" data-label="Job Id">
        {getWordsLevelLabel(words?.level)}
      </div>
      <div className="col col-1 desc buttonCol" data-label="Job Id">
        <p className="titleCol">{getWordsStatusLabel(words?.status)}</p></div>
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
  const categoryData = useSelector(getCategoryGetData)?.data?.list
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setSearchFilter(e.target.value)
      let data = {
        skip: page0,
        limit: page5,
        search: e.target.value
      }
      dispatch(getWordsThunk(data));

    } else {
      dispatch(getWordsThunk(ConstPagiantion(page0, page5)));
      setSearchFilter(undefined)
    }
  }
 
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
    localStorage.setItem("wordId", id)
    navigate(`/words/${id}`)
    dispatch(getIdWordsThunk(id));
  }

  useEffect(() => {
    dispatch(getWordsThunk(ConstPagiantion(page0, page12)));
  }, []);


  useEffect(() => {
    dispatch(learningLanguagesThunk(ConstPagiantion(page0, page12)));
    dispatch(nativeLanguageGetThunk(ConstPagiantion(page0, page12)));
    dispatch(categoryGetThunk(ConstPagiantion(page0, page12)));
  }, []);


  const fetchData = useCallback(() => {
    dispatch(getWordsThunk(ConstPagiantion(page0, page6)));
  }, [dispatch]);

  const fetchFilteredData = useCallback(() => {
    const filterData = {
      skip: page0,
      limit: page6,
      language: lerningLanguage,
      level: filterLevel,
      category: valueCategory,
      translateLanguage: nativeLanguage,
    };
    dispatch(getWordsThunk(filterData));
  }, [dispatch, lerningLanguage, filterLevel, valueCategory, nativeLanguage]);

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
            valueLevel={valueLevel}
            categoryData={categoryData}
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

          <CustomSearchInput searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearch={onChangeSearch} />
        </div>

        <div className="wordsScreenTable">
          <div className="container">
            <ul className="responsive-table">
              <TableHeader data={customTableColumns} />
              {wordsLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
              </div> :
                <>
                  {!wordsResponse?.data?.list?.length && !wordsLoading ?
                    <CustomNoData /> : wordsResponse?.data?.list?.map((words, index) => {
                      return (
                        <WordsListItem words={words} onClick={() => updateWords(words?._id)} key={index} />

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
