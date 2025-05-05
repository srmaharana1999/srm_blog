import OTPForm from "@/components/OTP";
import { sign } from "crypto";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const userValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, "Invalid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Invalid Password.")
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters and contain letters and numbers only."
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  bio: Yup.string()
    .max(100, "Bio must be at most 100 characters.")
    .required("Bio is required."),
});

const signup = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default signup;
