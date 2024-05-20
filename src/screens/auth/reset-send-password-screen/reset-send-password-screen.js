import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { CustomInputField, CustomButton } from "../../../components";
import { Colors } from "../../../assets/colors/index";
import { useTranslation } from "react-i18next";
import { resetPasswordThunk } from "../../../store/slices/auth";
import "../../../global-styles/global-styles.css";

export const ResetSendPasswordScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
            dispatch(resetPasswordThunk(values));
          }}
          // validationSchema={loginValidatoinSchema}
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
                type="password"
                name="password"
                placeholder={t("NEW_PASSWORD")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isPassword={true}
              />
              <CustomInputField
                type="password"
                name="confirmPassword"
                placeholder={t("CONFIRM_PASSWORD")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isPassword={true}
              />
              <p style={{ color: Colors.RED }}>
                {errors.username && touched.username && errors.username}
              </p>
              <CustomButton buttonTitle={t("SEND_CODE")} />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
