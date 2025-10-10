"use client";
import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import TextField from "../Inputs/TextField";
import {
  initialValues,
  OTPGenerateTypes,
  OTPGValidationSchema,
} from "@/lib/Schema/otp-generate";
import { useRouter } from "next/navigation";

interface IGenerateOTPFormProps {
  setEmail: (email: string) => void;
  setStep: (value: "generate" | "verify") => void;
  setStatus: (value: string) => void;
}

const GenerateOTPForm = (props: IGenerateOTPFormProps) => {
  const Router = useRouter();
  const handleOTPGenerate = async (
    values: OTPGenerateTypes,
    formikHelpers: FormikHelpers<OTPGenerateTypes>
  ) => {
    try {
      const response = await axios.post("/api/user/generate-otp", {
        email: values.email,
      });
      console.log("response", response);
      if (response.data?.data.isVerified) {
        Router.push("/sign-up");
        props.setStatus(`This ${values.email} is already verified.`);
      } else {
        props.setEmail(response.data?.data.email);
        props.setStep("verify");
        props.setStatus(response.data.message);
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.response?.data?.data.isOTPValid) {
        props.setEmail(values.email);
        props.setStep("verify");
      }
      props.setStatus(error.response?.data?.error || "Failed to send OTP");
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OTPGValidationSchema}
      onSubmit={handleOTPGenerate}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3 w-full">
          <h2 className="text-xl font-semibold text-white">Generate OTP</h2>

          <TextField
            name="email"
            label="E-mail"
            type="email"
            placeholder="Enter your email"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className=" bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {isSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default GenerateOTPForm;
