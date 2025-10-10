import * as Yup from "yup";

export const initialValues = {
  email: "",
};

export const OTPGValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email address is required."),
});

export type OTPGenerateTypes = Yup.InferType<typeof OTPGValidationSchema>;
