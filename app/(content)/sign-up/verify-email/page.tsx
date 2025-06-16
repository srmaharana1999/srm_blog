"use client";

import { useState } from "react";

import GenerateOTPForm from "@/components/GenerateOTPForm";
import OTPForm from "@/components/OTPForm";

const VerifyEmail = () => {
  const [step, setStep] = useState<"generate" | "verify">("generate");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState("");

  return (
    <div className="max-sm:w-96 max-w-sm mx-auto rounded-2xl p-4 shadow-md shadow-green-300 pb-3">
      {step === "generate" ? (
        <GenerateOTPForm
          setEmail={setEmail}
          setStep={setStep}
          setStatus={setStatus}
        />
      ) : (
        <OTPForm email={email} setStatus={setStatus} />
      )}
      <div className="min-h-4">
        {status && <p className="text-xs text-red-500 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
