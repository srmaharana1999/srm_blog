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

interface IOTPFormProps {
  email: string;
  setStatus: (value: string) => void;
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
      await axios.post("/api/user/verify-otp", {
        email: props.email,
        otp: values.otp,
      });
      props.setStatus("Email Verified Successfully.");

      router.push("/sign-up");
    } catch (error: any) {
      props.setStatus(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{ email: props.email, otp: "" }}
      validationSchema={verifySchema}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className=" text-black p-2">
          <p className="text-lg mb-6">Enter Your OTP :-</p>

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
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="w-full flex flex-col items-center gap-2 justify-center mt-2">
            <div className="min-h-4">
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OTPForm;
