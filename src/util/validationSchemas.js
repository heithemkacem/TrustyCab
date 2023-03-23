import * as Yup from "yup";

export const ForgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
});

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(24, "Too Long!")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter.")
    .matches(/(?=.*[A-Z])/, "Password must contain a uppercase letter.")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  fullName: Yup.string().required("FullName required"),
  phone: Yup.number().required("Phone number required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Required"),
});

export const ResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Enter a password")
    .min(8, "Your password must be at least 8 characters")
    .max(24, "Your password must be at most 24 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")

    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")

    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});
