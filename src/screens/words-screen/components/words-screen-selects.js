import React, { useEffect, useState } from "react";
import { CustomAntdSelect, CustomSearchInput } from "../../../components";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetThunk, getCategoryGetData, getNativeGetResponse, learningLanguages, learningLanguagesThunk, nativeLanguageGetThunk } from "../../../store/slices";
import { wordlevel } from "../../../data";

export const WordsScreenSelects = ({setSearchValue ,searchValue, learningLanguageWordSelectedValue,setLearningLanguageWordSelectedValue,setWordsCategorySelectValue,setWordsLevelSelectedValue,setWordsNativeLanguageSelectValue, wordsNativeLanguageSelectValue, wordsLevelSelectedValue, wordsCategorySelecteValue, }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();


  const learningLanguagesData = useSelector(learningLanguages);
  const categoryData = useSelector(getCategoryGetData)?.data?.list;
  const nativeLanguagesResponse = useSelector(getNativeGetResponse);


  const dataSkip = {
    skip: 0,
    limit: 12,
  };

  useEffect(() => {
    dispatch(learningLanguagesThunk(dataSkip));
    dispatch(categoryGetThunk(dataSkip));
    dispatch(nativeLanguageGetThunk(dataSkip))

  }, []);

  const filteredResponse = learningLanguagesData?.data?.list?.map((lang) => {
    return {
      _id: lang._id,
      label: lang.name.toLowerCase(),
      value: lang.name,
      nativeLanguages: lang?.nativeLanguages
    };
  });


  const filteredResponseCategory = categoryData?.map((lang) => {
    return {
      _id: lang._id,
      label: lang.name.toLowerCase(),
      value: lang.name,
    };
  });


  const filteredResponseNative = nativeLanguagesResponse?.data?.list.map((lang) => {
    return {
      _id: lang.id,
      name: lang.name.toLowerCase(),
      value: lang.name,
    };
  });




  return (
    <div className="wordScreenSelectsDiv">
      <CustomAntdSelect
        className="wordsSelect"
        optinData={filteredResponse}
        selected={learningLanguageWordSelectedValue}
        setSelected={setLearningLanguageWordSelectedValue}
        defaultValue={t("LEARNING_LANGUAGE")}
        color={Colors.LIGHT_GRAY}
      />
      <CustomAntdSelect
        className="wordsSelect"
        optinData={filteredResponseNative}
        selected={wordsNativeLanguageSelectValue}
        setSelected={setWordsNativeLanguageSelectValue}
        defaultValue={t("NATIVE_LANGUAGE")}
        color={Colors.LIGHT_GRAY}
      />
      <CustomAntdSelect
        className="wordsSelect"
        optinData={wordlevel}
        selected={wordsLevelSelectedValue}
        setSelected={setWordsLevelSelectedValue}
        defaultValue={t("LEVEL")}
        color={Colors.LIGHT_GRAY}
      />
      <CustomAntdSelect
        className="wordsSelect"
        optinData={filteredResponseCategory}
        selected={wordsCategorySelecteValue}
        setSelected={setWordsCategorySelectValue}
        defaultValue={t("CATEGORY")}
      />
      <CustomSearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
  );
};
