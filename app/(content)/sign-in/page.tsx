"use client";

import TextField from "@/components/Inputs/TextField";
import { Button } from "@/components/ui/button";
import {
  initialValues,
  SigninTypes,
  SigninValidationSchema,
} from "@/lib/Schema/sign-in";
import { Formik, Form, FormikHelpers } from "formik";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const Signin = () => {
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (
    values: SigninTypes,
    formikHelpers: FormikHelpers<SigninTypes>
  ) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (res?.error) {
      setStatus(res.error);
    } else {
      formikHelpers.setSubmitting(false);
      router.push("/");
    }
  };
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="max-w-sm w-11/12 sm:w-full mx-auto text-white p-6 rounded-base border-border border-2 shadow-shadow">
        <h1 className="text-2xl font-semibold text-center">SIGN IN</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={SigninValidationSchema}
          onSubmit={handleSubmit}
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

        {status && <p className="text-xs text-red-500 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default Signin;
