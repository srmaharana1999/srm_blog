"use client";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { TfiReload } from "react-icons/tfi";

interface IOTPFormProps {
  email: string;
  setStatus: (value: string) => void;
  setStep: (value: "generate" | "verify") => void;
}

const OTPForm = (props: IOTPFormProps) => {
  const verifySchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
      .required("OTP is required"),
  });

  const router = useRouter();
  const handleSubmit = async (
    values: { otp: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await axios.post("/api/user/verify-otp", {
        email: props.email,
        otp: values.otp,
      });
      props.setStatus(response.data?.message || "Email Verified Successfully.");

      if (response.data?.data.isVerified) {
        router.replace("/sign-up");
      }
    } catch (error: any) {
      console.log("otp form", error.response.data?.error);
      props.setStatus(error.response?.data?.error || "OTP verification failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    props.setStep("generate");
    props.setStatus("Generate OTP again.");
  };
  return (
    <Formik
      initialValues={{ email: props.email, otp: "" }}
      validationSchema={verifySchema}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className=" text-black space-y-6">
          <p className="">Enter Your OTP</p>

          <div className=" flex justify-center">
            <InputOTP
              maxLength={6}
              value={values.otp}
              onChange={(val) => {
                if (/^\d*$/.test(val)) {
                  setFieldValue("otp", val);
                }
              }}
              pattern="\d*"
              inputMode="numeric"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="w-full flex flex-col items-center gap-2 justify-center">
            <ErrorMessage
              name="otp"
              component="div"
              className="text-red-500 text-xs"
            />

            <div className="w-full flex justify-center items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
              <Button type="button" onClick={handleClick}>
                <TfiReload className="text-2xl" />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OTPForm;
