"use client";
import ImageUpload from "@/components/ImageUpload";
import TextArea from "@/components/Inputs/TextArea";
import TextField from "@/components/Inputs/TextField";
import { Button } from "@/components/ui/button";
import {
  initialValues,
  SignupTypes,
  SignupValidationSchema,
} from "@/lib/Schema/sign-up";
import { UploadResponse } from "@imagekit/next";
import axios from "axios";
import { Formik, Form, FormikHelpers } from "formik";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [avatarUrl, setAvatarUrl] = useState<UploadResponse>();
  const [status, setStatus] = useState("");
  const router = useRouter();
  const handleUpload = (res: UploadResponse) => {
    if (!res) {
      setStatus("Image Upload failed.");
    }
    setAvatarUrl(res);
  };

  const handleSubmit = async (
    values: SignupTypes,
    formikHelpers: FormikHelpers<SignupTypes>
  ) => {
    try {
      const response = await axios.post("/api/user/signup", {
        username: values.username,
        password: values.password,
        avatarUrl: avatarUrl?.url || "/avatar.png",
        bio: values.bio,
      });
      if (response.data?.success) {
        router.push("/sign-in");
      }
      setStatus(response.data?.message);
    } catch (error: any) {
      setStatus(error.response?.data?.error || "Error in form submission.");
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <div className="max-sm:w-96 mt-30 max-w-md mx-auto rounded-base border-border border-2 shadow-shadow p-4  pb-3 space-y-4">
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
          initialValues={initialValues}
          validationSchema={SignupValidationSchema}
          onSubmit={handleSubmit}
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

      {status && (
        <p className="text-xs text-red-500 text-center mt-4">{status}</p>
      )}
    </div>
  );
};

export default Signup;
