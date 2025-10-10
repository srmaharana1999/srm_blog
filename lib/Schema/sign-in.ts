import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const SigninValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("username is required."),
  password: Yup.string()
    .min(8, "Invalid Password.")
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters and contain letters and numbers only."
    ),
});

export type SigninTypes = Yup.InferType<typeof SigninValidationSchema>;
