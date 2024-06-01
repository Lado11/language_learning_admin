import React, { useEffect } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomInputField, CustomButton } from "../../../components";
import { sendEmailValidatoinSchema } from "../../../validations";
import { Colors } from "../../../assets/colors/index";
import { useTranslation } from "react-i18next";
import {
  sendEmailResponse,
  sendEmailThunk,
  deleteSendEmailResponse,
  saveSendedEmail,
  sendEmailLoading,
} from "../../../store/slices";
import "../../../global-styles/global-styles.css";

export const ResetPasswordEmail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sendEmailResponseData = useSelector(sendEmailResponse);
  const sendEmailLoadingData = useSelector(sendEmailLoading);

  useEffect(() => {
    if (sendEmailResponseData?.success) {
      navigate("/emailVerafication");
    }
  }, [sendEmailResponseData?.success]);

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
            dispatch(saveSendedEmail(values.email));
            localStorage.setItem("email", values.email);
            dispatch(sendEmailThunk(values));
          }}
          validationSchema={sendEmailValidatoinSchema}
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
                type="email"
                name="email"
                placeholder={t("EMAIL")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                onFocus={() => dispatch(deleteSendEmailResponse())}
              />
              <p style={{ color: Colors.RED }}>
                {errors.email && touched.email && errors.email}
              </p>
              {sendEmailResponseData?.message &&
                sendEmailResponseData?.success === false && (
                  <p className="errorMessage">
                    {sendEmailResponseData?.message}
                  </p>
                )}
              <CustomButton
                buttonTitle={t("SEND_CODE")}
                loading={sendEmailLoadingData}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
