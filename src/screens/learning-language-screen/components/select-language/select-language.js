import React from "react";
import { CustomSelect } from "../../../../components";
import "./select-language-style.css";
import { Colors } from "../../../../assets/colors";
import britishIcon from "../../../../assets/images/britishCountryIcon.svg.svg";

export const SelectLanguage = () => {
  const languages = [
    {
      language: "English",
      image: britishIcon,
    },
    {
      language: "German",
      image: britishIcon,
    },
  ];

  return (
    <div className="selectLanguageMainDiv">
      <p className="selectLanguageTitle">Native Language</p>
      <CustomSelect title="Choose Native Language *" />
      <div className="selectLanguageValuesDiv">
        {languages.map((lang) => {
          return (
            <div
              className="selectLanguageValuesDivItem"
              style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
            >
              <div className="deleteIcon">
                <span>x</span>
              </div>
              <span>{lang.language}</span>
              <img src={lang.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
