import React, { useState } from "react";
import "./custom-input-styl.css";
import { useTranslation } from "react-i18next";
import { Colors } from "../../assets/colors/colors";
import eyeIcon from "../../assets/images/eyeIcon.svg";
import { useDispatch } from "react-redux";

export const CustomInputField = ({
  name,
  placeholder,
  label,
  isForgot,
  onChange,
  onBlur,
  type,
  isPassword,
  onFocus
}) => {
  const { t } = useTranslation();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const dispatch = useDispatch();

  const onDisplayed = () => {
    setIsDisplayed(!isDisplayed);
  };

  return (
    <div className="customInputMainDiv">
      <div className="customInputLabelDiv">
        <p className="customInputLabel">{label}</p>
        {isForgot ? (
          <a
            href="/sendEmail"
            style={{ color: Colors.PURPLE }}
            className="customInputLabel customInputForgotLabel"
          >
            {t("FORGOT")} ?
          </a>
        ) : null}
      </div>
      <div
        className="customInputDiv"
        style={{ backgroundColor: Colors.INPUT_BACKGROUND }}
      >
        <input
          name={name}
          type={isDisplayed ? "text" : type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className="customInput"
          onFocus={onFocus}
          style={{ backgroundColor: Colors.INPUT_BACKGROUND }}
        />
        {isPassword ? (
          <img
            src={eyeIcon}
            className="passwordFieldEyeIcon"
            onClick={onDisplayed}
          />
        ) : null}
      </div>
    </div>
  );
};
