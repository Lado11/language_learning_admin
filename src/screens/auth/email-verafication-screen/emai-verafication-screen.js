import React, { useEffect } from "react";
import { Colors } from "../../../assets/colors/colors";
import { useTranslation } from "react-i18next";
import PinInput from "react-pin-input";
import "./email-verafication-screen-style.css";
import {
  saveCode,
  savedEmail,
  sendCodeResponseData,
  sendCodeThunk,
} from "../../../store/slices";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const EmailVeraficationScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxEmail = useSelector(savedEmail);
  const storageEmail = localStorage.getItem("email");
  const sendCodeResponse = useSelector(sendCodeResponseData);
  const email = reduxEmail ? reduxEmail : storageEmail;

  useEffect(() => {
    if (sendCodeResponse?.success) {
      navigate("/resetPassword");
    }
  }, [sendCodeResponse?.success]);

  return (
    <div
      className="emailVeraficationScreenMainDiv"
      style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
    >
      <div
        className="emailVeraficationScreenSubDiv"
        style={{ backgroundColor: Colors.WHITE }}
      >
        <p className="emailVeraficationTitle">{t("EMAIL_VERIFICATION")}</p>
        <div className="emailVerificationDescriptionDiv">
          <p
            className="emailVerificationDescription"
            style={{ color: Colors.TEXT_FONT }}
          >
            {t("EMAIL_VERIFICATION_DESCRIPTION_PART_ONE")}
          </p>
          <p
            className="emailVerificationDescription"
            style={{ color: Colors.TEXT_FONT }}
          >
            {t("EMAIL_VERIFICATION_DESCRIPTION_PART_TWO")}
          </p>
        </div>
        <PinInput
          length={6}
          initialValue=""
          onChange={(value, index) => {}}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{
            border: "none",
            backgroundColor: Colors.BACKGROUND_COLOR,
            borderRadius: 8,
            margin: "0 6px",
          }}
          onComplete={(value) => {
            dispatch(saveCode(value));
            localStorage.setItem("code", "112233");
            dispatch(sendCodeThunk({ email, value }));
          }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        <p
          className="emailVerificationReceivCodeText"
          style={{ color: Colors.TEXT_FONT }}
        >
          {t("DONT_RECEIVE_CODE")}
          <span
            style={{ color: Colors.PURPLE_SECOND }}
            className="emailVerificationReceivCodeText emailVerificationResendText"
          >
            {t("RESEND")}
          </span>
        </p>
      </div>
    </div>
  );
};
