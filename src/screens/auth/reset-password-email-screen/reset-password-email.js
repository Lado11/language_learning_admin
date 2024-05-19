import React from 'react';
import '../../../global-styles/global-styles.css';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { CustomInputField, CustomButton } from "../../../components";
import { Colors } from '../../../assets/colors/index';
import { useTranslation } from 'react-i18next';
import { sendEmailThunk } from '../../../store/slices/auth/send-email-slice';

export const ResetPasswordEmail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className='authScreenMainDiv' style={{ backgroundColor: Colors.WHITE }}> 
            <div className='authScreenSubDiv'>
                <p className="titleStyle">{t("RESET_PASSWORD")}</p>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values) => {
                        dispatch(sendEmailThunk(values))
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
                            type="text"
                            name="email"
                            placeholder={t("EMAIL")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <p style={{ color: Colors.RED }}>
                            {errors.username && touched.username && errors.username}
                        </p>
                        <CustomButton buttonTitle={t("SEND_CODE")}/>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}