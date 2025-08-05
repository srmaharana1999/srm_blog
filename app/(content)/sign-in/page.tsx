"use client";

import TextField from "@/components/Inputs/TextField";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const LoginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("username is required."),
  password: Yup.string()
    .min(8, "Invalid Password.")
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters and contain letters and numbers only."
    ),
});

const Signin = () => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  return (
    <div className="max-sm:w-96 max-w-md mx-auto text-white p-6 rounded-base border-border border-2 shadow-shadow space-y-4">
      <h1 className="text-2xl font-semibold text-center mb-6">SIGN IN</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });

          if (res?.error) {
            setStatus(res.error);
          } else {
            setSubmitting(false);
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-1 my-2">
            <TextField
              name="email"
              label="E-mail"
              type="email"
              placeholder="Enter your email"
            />
            <TextField
              name="password"
              label="Password"
              placeholder="Enter your Password"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Sign IN"
              )}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="min-h-4 mt-3">
        {status && <p className="text-xs text-red-500 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default Signin;
