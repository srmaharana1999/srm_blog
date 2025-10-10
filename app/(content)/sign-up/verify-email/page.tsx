"use client";

import { useState } from "react";

import GenerateOTPForm from "@/components/GenerateOTPForm";
import OTPForm from "@/components/OTPForm";

const VerifyEmail = () => {
  const [step, setStep] = useState<"generate" | "verify">("generate");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <div className="max-w-xs w-11/12 sm:w-full mx-auto text-white p-4 rounded-base border-border border-2 shadow-shadow">
        {step === "generate" ? (
          <GenerateOTPForm
            setEmail={setEmail}
            setStep={setStep}
            setStatus={setStatus}
          />
        ) : (
          <OTPForm email={email} setStatus={setStatus} setStep={setStep} />
        )}

        {status && (
          <p className="text-xs text-red-500 text-center mt-4">{status}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
