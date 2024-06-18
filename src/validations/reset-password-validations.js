import * as Yup from "yup";

export const resetPasswordValidation = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
