import * as Yup from "yup";

export const loginValidatoinSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid Email!"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
