import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import "../../../global-styles";
import "./login_style.css";
import "../../../global-styles/global-styles.css";
import { useTranslation } from "react-i18next";
import { CustomInputField, CustomButton } from "../../../components";
import { Colors } from "../../../assets/colors/colors";
import {
  getLoginError,
  getLoginLoading,
  loginThunk,
} from "../../../store/slices";
import { loginValidatoinSchema } from "../../../validations";
import { useNavigate } from "react-router-dom";
import { deleteErrorMessage } from "../../../store/slices";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const error = useSelector(getLoginError);
  const loginLoading = useSelector(getLoginLoading);

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("code");
  }, []);

  return (
    <div
      className="loginScreenMainDiv"
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
              {error != null ? (
                <p className="errorMessage">
                  {t("INVALID_USERNAME_OR_PASSWORD")}
                </p>
              ) : null}
              <CustomInputField
                type="text"
                name="email"
                label={t("EMAIL")}
                placeholder={t("EMAIL_PLACEHOLDER")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                onFocus={() => dispatch(deleteErrorMessage())}
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
                onFocus={() => dispatch(deleteErrorMessage())}
              />
              <p style={{ color: Colors.RED }}>
                {errors.password && touched.password && errors.password}
              </p>
              <CustomButton
                buttonTitle={t("LOGIN_NOW")}
                loading={loginLoading}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
