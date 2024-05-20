import React, { useEffect, useState } from "react";
import { CustomSelect } from "../../../../components";
import "./select-language-style.css";
import { Colors } from "../../../../assets/colors";
import britishIcon from "../../../../assets/images/britishCountryIcon.svg.svg";
import { useDispatch, useSelector } from "react-redux";
import { getNativeGetResponse } from "../../../../store/slices/native-language/native-language-get";

export const SelectLanguage = () => {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);
  const nativeLanguagesResponse = useSelector(getNativeGetResponse);
  const filteredResponse = nativeLanguagesResponse?.data?.list.map((lang) => {
    return {
      id: lang.id,
      value: lang.name.toLowerCase(),
      label: lang.name,
    };
  });

  const onDelete = (searchItem) => {
    const newLangsArr = languages.filter((lang) => {
      return lang.label != searchItem;
    });
    setLanguages(newLangsArr);
  };

  return (
    <div className="selectLanguageMainDiv">
      <p className="selectLanguageTitle">Native Language</p>
      <CustomSelect
        title="Choose Native Language *"
        optionsData={filteredResponse}
        setLanguage={setLanguages}
        languages={languages}
      />
      <div className="selectLanguageValuesDiv">
        {languages.map((lang) => {
          return (
            <div
              className="selectLanguageValuesDivItem"
              style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
            >
              <span>{lang.label}</span>
              <img src={lang.image} />
              <div
                className="deleteIcon"
                onClick={() => {
                  onDelete(lang.label);
                }}
              >
                <span>x</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
