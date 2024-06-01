import React, { useState } from "react";
import { CustomAntdSelect, CustomSearchInput } from "../../../components";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../assets/colors";

export const WordsScreenSelects = () => {
  const { t } = useTranslation();
  const [
    learningLanguageWordSelectedValue,
    setLearningLanguageWordSelectedValue,
  ] = useState();
  const [wordsNativeLanguageSelectValue, setWordsNativeLanguageSelectValue] =
    useState();
  const [wordsLevelSelectedValue, setWordsLevelSelectedValue] = useState();
  const [wordsCategorySelecteValue, setWordsCategorySelectValue] = useState();

  const data = [
    {
      value: "1",
      label: "admin",
    },
    {
      value: "2",
      label: "client",
    },
    {
      value: "3",
      label: "operator",
    },
  ];

  return (
    <div className="wordScreenSelectsDiv">
      <CustomAntdSelect
      className="wordsSelect"
        optinData={data}
        selected={learningLanguageWordSelectedValue}
        setSelected={setLearningLanguageWordSelectedValue}
        defaultValue={t("LEARNING_LANGUAGE")}
        color={Colors.LIGHT_GRAY}
      />
      <CustomAntdSelect
      className="wordsSelect"
        optinData={data}
        selected={wordsNativeLanguageSelectValue}
        setSelected={setWordsNativeLanguageSelectValue}
        defaultValue={t("NATIVE_LANGUAGE")}
        color={Colors.LIGHT_GRAY}
      />
      <CustomAntdSelect
      className="wordsSelect"
        optinData={data}
        selected={wordsLevelSelectedValue}
        setSelected={setWordsLevelSelectedValue}
        defaultValue={t("LEVEL")}
        color={Colors.LIGHT_GRAY}
      />
      <CustomAntdSelect
      className="wordsSelect"
        optinData={data}
        selected={wordsCategorySelecteValue}
        setSelected={setWordsCategorySelectValue}
        defaultValue={t("CATEGORY")}
      />
      <CustomSearchInput />
    </div>
  );
};
