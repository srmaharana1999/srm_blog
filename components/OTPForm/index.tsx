"use client";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
  return (
    <Formik
      initialValues={{ email: props.email, otp: ["", "", "", "", "", ""] }}
      validationSchema={verifySchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const fullOTP = values.otp.join("");
          await axios.post("/api/user/verify-otp", {
            email: props.email,
            otp: fullOTP,
          });
          props.setStatus("Email Verified Successfully.");
        } catch (error: any) {
          props.setStatus(
            error.response?.data?.message || "OTP verification failed"
          );
        } finally {
          setSubmitting(false);
        }
      }}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 text-black">
          {props.email && (
            <p className="text-sm">{`OTP has been sent to ${props.email} check your email!`}</p>
          )}

          <FieldArray
            name="otp"
            render={(arrayHelpers) => {
              console.log(arrayHelpers.form.values.otp);
              return (
                <div className="flex justify-between">
                  {arrayHelpers.form.values.otp.map((_, index: number) => (
                    <div key={index}>
                      <Field
                        name={`otp[${index}]`}
                        maxLength="1"
                        pattern="[0-9]"
                        inputMode="numeric"
                        className="w-10 h-10 p-1 text-center text-2xl border rounded-md text-black"
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
          <ErrorMessage
            name="otp"
            component="div"
            className="text-red-500 text-sm"
          />

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
