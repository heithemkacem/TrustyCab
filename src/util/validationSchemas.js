import * as Yup from "yup";

//!Comment Schema
export const CommentSchema = Yup.object().shape({
  comment: Yup.string().required("Please enter your comment"),
});

//!Forget Password Schema
export const ForgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
});
//!Taxi Bannner Schema
export const taxiBannerSchema = Yup.object().shape({
  taxiBanner: Yup.number().required("Please enter the taxi banner"),
});

//!Signup Schema
export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(24, "Too Long!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  fullName: Yup.string().required("FullName required"),
  phone: Yup.number().required("Phone number required"),
});

//!Login Schema
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Required"),
});

//!Reset Password Schema
export const ResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Enter a password")
    .min(8, "Your password must be at least 8 characters")
    .max(24, "Your password must be at most 24 characters"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});
