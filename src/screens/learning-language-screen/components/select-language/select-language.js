import React, { useEffect, useState } from "react";
import { CustomSelect } from "../../../../components";
import "./select-language-style.css";
import { Colors } from "../../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { getNativeGetResponse } from "../../../../store/slices/native-language/native-language-get";

import {
  addLanguages,
  getUpdatedLanguages,
  learnLanguageSelectedLanguages,
  removeSelectedLanguagesItem,
} from "../../../../store/slices";

export const SelectLanguage = ({ dataLanguages }) => {
  const dispatch = useDispatch();
  const [newLanguages, setNewLanguages] = useState();
  // const languages = useSelector(learnLanguageSelectedLanguages);
  // console.log(languages,"lang")
  const nativeLanguagesResponse = useSelector(getNativeGetResponse);
  
  const filteredResponse = nativeLanguagesResponse?.data?.list.map((lang) => {
    return {
      _id: lang.id,
      name: lang.name.toLowerCase(),
      nameEng: lang.name,
    };
  });

  const onDelete = (id) => {
    dispatch(removeSelectedLanguagesItem(id));
  };

  // useEffect(() => {
  //   dispatch(addLanguages(filteredResponse));
  // }, [nativeLanguagesResponse?.nativeLanguages]);

  return (
    <div className="selectLanguageMainDiv">
      <p className="selectLanguageTitle">Native Language</p>
      <CustomSelect
        title="Choose Native Language *"
        optionsData={filteredResponse}
      />
      <div className="selectLanguageValuesDiv">
        {dataLanguages?.map((lang) => {
          return (
            <div
              key={lang._id}
              className="selectLanguageValuesDivItem"
              style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
            >
              <span>{lang.name}</span>
              <img src={lang.image} />
              <div
                className="deleteIcon"
                onClick={() => {
                  onDelete(lang._id);
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
