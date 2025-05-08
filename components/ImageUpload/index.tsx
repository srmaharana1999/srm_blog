"use client";
import {
  Image,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
  // UploadResponse,
} from "@imagekit/next";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState, useRef } from "react";

interface UploadProps {
  onSuccess: (res: UploadResponse) => void;
}

const ImageUpload = (props: UploadProps) => {
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState<UploadResponse>(Object);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.log("Failed to authenticate for upload: ", authError);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse: UploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,

        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      console.log("Upload Response: ", uploadResponse);
      setResponse(uploadResponse);
      props.onSuccess(uploadResponse);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };
  return (
    <div className="w-full h-full rounded-md flex flex-col p-1">
      <div className="h-6">
        {progress > 0 && (
          <progress
            max={100}
            value={progress}
            className="w-full h-1"
          ></progress>
        )}
      </div>

      <div className="w-full flex-1 grid grid-cols-2">
        <div className="w-full relative">
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT}
            src={response.filePath || "avatar.png"}
            fill
            alt="Picture of the author"
            transformation={[{ width: "100%", height: "100%" }]}
          />
        </div>
        <div className="grid grid-rows-3">
          <div
            className=" h-full w-full bg-gray-600  row-span-2 flex justify-center items-center"
            onClick={handleDivClick}
          >
            <FaCloudUploadAlt className="text-7xl text-white" />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" />
          <div className="bg-amber-200 rounded-2xl row-span-1">
            <button
              className=" bg-gray-800 text-white p-1 text-sm w-full h-full "
              type="button"
              onClick={handleUpload}
            >
              Upload file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
