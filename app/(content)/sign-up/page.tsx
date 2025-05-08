"use client";
import ImageUpload from "@/components/ImageUpload";
import { UploadResponse } from "@imagekit/next";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const userValidationSchema = Yup.object({
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

const Signup = () => {
  const [avatarUrl, setAvatarUrl] = useState<UploadResponse>();
  const [status, setStatus] = useState("");
  const handleUpload = (res: UploadResponse) => {
    setAvatarUrl(res);
  };
  return (
    <div className="max-sm:w-96 max-w-md mx-auto rounded-2xl p-4 shadow-md shadow-green-300 pb-3 space-y-4">
      <div className="h-48">
        <ImageUpload onSuccess={handleUpload} />
      </div>
      <div className="min-h-2">
        {!avatarUrl && (
          <p className="text-white text-center">
            Please upload your avatar to continue.
          </p>
        )}
      </div>
      <div>
        <Formik
          initialValues={{
            username: "",
            bio: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={userValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post("/api/user/signup", {
                username: values.username,
                password: values.password,
                avatarUrl: avatarUrl?.url || "/avatar.png",
                bio: values.bio,
              });
              console.log(response);
              console.log(values);
            } catch (error: any) {
              setStatus(
                error.response?.data?.message || "OTP verification failed"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-2 my-2">
              <Field
                name="username"
                type="text"
                placeholder="Enter your username"
                className="w-full p-2 border rounded-md"
                disabled={!avatarUrl}
              />
              <div className="min-h-4">
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <Field
                name="bio"
                type="text"
                placeholder="Enter your bio"
                className="w-full p-2 border rounded-md"
                disabled={!avatarUrl}
              />
              <div className="min-h-4">
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md"
                disabled={!avatarUrl}
              />
              <div className="min-h-4">
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <Field
                name="confirmPassword"
                type="text"
                placeholder="Enter your confirm password"
                className="w-full p-2 border rounded-md"
                disabled={!avatarUrl}
              />
              <div className="min-h-4">
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Sign UP"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
