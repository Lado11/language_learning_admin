import * as Yup from "yup";

export const sendEmailValidatoinSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid Email!"),
});
