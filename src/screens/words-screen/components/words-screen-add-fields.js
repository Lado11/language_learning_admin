import React from "react";
import "../words-screen-style.css";
import { CustomAddNew } from "../../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const WordsScreenAddFields = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="wordsScreenAddFields">
      <CustomAddNew
        title={t("ADD_NEW_WORDS")}
        onClick={() => onNavigate("/words/create")}
      />
      {/* <CustomAddNew title={t("ADD_WORDS_FROM_EXCEL")} onClick={() => onNavigate("/create-word-exel")} />
      <CustomAddNew title={t("UPDATE_WORDS_FROM_EXCEL")} onClick={() =>onNavigate("/update-word-exel") }/> */}
    </div>
  );
};
export const UploadScreenAddFields = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="wordsScreenAddFields">
      <CustomAddNew title={t("ADD_WORDS_FROM_EXCEL")} onClick={() => onNavigate("/upload/create-wordsfrom-excel")} />
      <CustomAddNew title={t("UPDATE_WORDS_FROM_EXCEL")} onClick={() => onNavigate("/upload/update-wordsfrom-excel")} />
    </div>
  );
};
