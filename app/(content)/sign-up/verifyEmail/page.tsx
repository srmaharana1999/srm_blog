"use client";

import { useState } from "react";

import GenerateOTPForm from "@/components/GenerateOTPForm";
import OTPForm from "@/components/OTPForm";

const VerifyEmail = () => {
  const [step, setStep] = useState<"generate" | "verify">("generate");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState("");

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      {step === "generate" ? (
        <GenerateOTPForm
          setEmail={setEmail}
          setStep={setStep}
          setStatus={setStatus}
        />
      ) : (
        <OTPForm email={email} setStatus={setStatus} />
      )}
      {status && <p className="text-xs text-red-500 text-center">{status}</p>}
    </div>
  );
};

export default VerifyEmail;
