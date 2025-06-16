"use client";
import ImageUpload from "@/components/ImageUpload";
import TextArea from "@/components/Inputs/TextArea";
import TextField from "@/components/Inputs/TextField";
import { Button } from "@/components/ui/button";
import { UploadResponse } from "@imagekit/next";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Loader2Icon } from "lucide-react";
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
                error.response?.data?.message || "Error in form submission."
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-1 my-2">
              <TextField
                name="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
                readOnly={!avatarUrl}
              />
              <TextArea
                name="bio"
                label="Bio"
                placeholder="Enter your bio"
                readOnly={!avatarUrl}
              />
              <TextField
                name="password"
                label="Password"
                placeholder="Enter your Password"
                readOnly={!avatarUrl}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your Confirm Password"
                readOnly={!avatarUrl}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className=" mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                {isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="min-h-4 mt-3">
        {status && <p className="text-xs text-red-500 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default Signup;
