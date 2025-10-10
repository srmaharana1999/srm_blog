import * as Yup from "yup";

export const initialValues = {
  username: "",
  bio: "",
  password: "",
  confirmPassword: "",
};

export const SignupValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, "Invalid username")
    .required("username is required."),
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

export type SignupTypes = Yup.InferType<typeof SignupValidationSchema>;
