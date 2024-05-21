import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import "../../../global-styles";
import "./login_style.css";
import { useTranslation } from "react-i18next";
import { CustomInputField, CustomButton } from "../../../components";
import { Colors } from "../../../assets/colors/colors";
import { getLoginData, getLoginError, getLoginMessage, loginThunk } from "../../../store/slices/auth/login-slice";
import { loginValidatoinSchema } from "../../../validations/login-validations";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const error = useSelector(getLoginMessage)
  console.log(error,"error")
  return (
    <div
      className="authScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="authScreenSubDiv">
        <p className="titleStyle">{t("LOGIN_TO_YOUR_ACCOUNT")}</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            dispatch(loginThunk(values));
          }}
          validationSchema={loginValidatoinSchema}
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
              <CustomInputField
                type="text"
                name="email"
                label={t("EMAIL")}
                placeholder={t("EMAIL_PLACEHOLDER")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p style={{ color: Colors.RED }}>
                {errors.email && touched.email && errors.email}
              </p>
              <CustomInputField
                type="password"
                name="password"
                isForgot={true}
                label={t("PASSWORD")}
                placeholder={t("ENTER_YOUR_PASSWORD")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isPassword={true}
              />
              <p style={{ color: Colors.RED }}>
                {errors.password && touched.password && errors.password}
              </p>
              <CustomButton buttonTitle={t("LOGIN_NOW")} />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
