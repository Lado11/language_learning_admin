import React, { useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CustomInputField, CustomButton } from "../../../components";
import { Colors } from "../../../assets/colors/index";
import { useTranslation } from "react-i18next";
import {
  deleteResponse,
  resetPasswordLoading,
  resetPasswordResponse,
  resetPasswordThunk,
  savedCode,
  savedEmail,
} from "../../../store/slices";
import "../../../global-styles/global-styles.css";
import { resetPasswordValidation } from "../../../validations";
import { useNavigate } from "react-router-dom";

export const ResetSendPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reduxCode = useSelector(savedCode);
  const storageCode = localStorage.getItem("code");
  const code = reduxCode ? reduxCode : storageCode;
  const reduxEmail = useSelector(savedEmail);
  const storageEmail = localStorage.getItem("email");
  const email = reduxEmail ? reduxEmail : storageEmail;
  const resetPasswordLoadingData = useSelector(resetPasswordLoading);
  const responseResetPassword = useSelector(resetPasswordResponse);


useEffect(()=>{
if(responseResetPassword?.success === true){
  navigate("/")
}
},[responseResetPassword])

  return (
    <div
      className="authScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="authScreenSubDiv">
        <p className="titleStyle">{t("RESET_PASSWORD")}</p>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            const password = values.password;
            dispatch(resetPasswordThunk({ email, code, password }));
          }}
          validationSchema={resetPasswordValidation}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <p className="errorMessage">{responseResetPassword?.message}</p>
              <CustomInputField
              onFocus={()=>{
                dispatch(deleteResponse())
              }}
                type="password"
                name="password"
                placeholder={t("NEW_PASSWORD")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isPassword={true}
              />
              <p style={{ color: Colors.RED }}>
                {errors.password && touched.password && errors.password}
              </p>
              <CustomInputField
               onFocus={()=>{
                dispatch(deleteResponse())
              }}
                type="password"
                name="confirmPassword"
                placeholder={t("CONFIRM_PASSWORD")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isPassword={true}
              />
              <p style={{ color: Colors.RED }}>
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
              <CustomButton
                buttonTitle={t("SEND_CODE")}
                loading={resetPasswordLoadingData}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
