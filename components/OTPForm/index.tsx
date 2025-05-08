"use client";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IOTPFormProps {
  email: string;
  setStatus: (value: string) => void;
}

const OTPForm = (props: IOTPFormProps) => {
  const verifySchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().matches(/^\d$/, "Must be a digit"))
      .length(6, "OTP must be 6 digits")
      .required("Required"),
  });

  const router = useRouter();
  const handleSubmit = async (
    values: { otp: string[] },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const fullOTP = values.otp.join("");
      await axios.post("/api/user/verify-otp", {
        email: props.email,
        otp: fullOTP,
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
      initialValues={{ email: props.email, otp: ["", "", "", "", "", ""] }}
      validationSchema={verifySchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 text-white p-2">
          <div className="min-h-4">
            <p className="text-xl">Enter Your OTP :-</p>
          </div>

          <FieldArray
            name="otp"
            render={(arrayHelpers) => {
              return (
                <div className="flex justify-between">
                  {arrayHelpers.form.values.otp.map((_, index: number) => (
                    <div key={index}>
                      <Field
                        name={`otp[${index}]`}
                        maxLength="1"
                        pattern="[0-9]"
                        inputMode="numeric"
                        className="w-10 h-10 p-1 text-center text-2xl border rounded-md text-white"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const { value } = e.target;
                          arrayHelpers.form.setFieldValue(
                            `otp[${index}]`,
                            value
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            }}
          ></FieldArray>
          <div className="min-h-1">
            <ErrorMessage
              name="otp"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OTPForm;
