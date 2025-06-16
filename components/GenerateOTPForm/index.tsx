"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import TextField from "../Inputs/TextField";

interface IGenerateOTPFormProps {
  setEmail: (email: string) => void;
  setStep: (value: "generate" | "verify") => void;
  setStatus: (value: string) => void;
}
const GenerateOTPForm = (props: IGenerateOTPFormProps) => {
  const generateSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required."),
  });

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={generateSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post("/api/user/generate-otp", {
            email: values.email,
          });

          // console.log(response.data.message);
          props.setEmail(response.data.message);
          props.setStep("verify");
          props.setStatus(
            `OTP successfully sent to your email ${response.data.message}`
          );
        } catch (error: any) {
          if (error.response?.data?.message === "OTP already sent") {
            props.setEmail(values.email);
            props.setStep("verify");
            props.setStatus("OTP already sent. Please check your email.");
          }
          props.setStatus(
            error.response?.data?.message || "Failed to send OTP"
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3 p-2">
          <div className="min-h-4">
            <h2 className="text-xl font-semibold text-white">Generate OTP</h2>
          </div>
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
