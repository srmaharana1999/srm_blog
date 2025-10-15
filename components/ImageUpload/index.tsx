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
import { useState, useRef } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { RiUploadCloud2Fill } from "react-icons/ri";
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
    <div className="w-full h-full rounded-md">
      {/* <div className="min-h-6"> */}
      {progress > 0 && (
        <progress max={100} value={progress} className="w-full h-1"></progress>
      )}
      {/* </div> */}

      <div className="w-full h-full relative">
        <div className="w-full h-full absolute left-0 top-0 z-0">
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT}
            src={response.filePath || "avatar.png"}
            fill
            className="border-2 border-border shadow-shadow rounded-base object-contain"
            alt="Picture of the author"
            transformation={[{ width: "100%", height: "100%" }]}
          />
        </div>
        <div className="absolute right-2 bottom-2 z-10 p-1 flex items-center gap-3">
          <div
            className="border-shadow py-1 px-2 backdrop-blur-sm"
            onClick={handleDivClick}
          >
            <FaFolderOpen className="text-3xl text-yellow-500 " />
            <input type="file" ref={fileInputRef} className="hidden" />
          </div>
          <button
            className="border-shadow py-1 px-2 backdrop-blur-sm"
            onClick={handleUpload}
          >
            <RiUploadCloud2Fill className="text-3xl text-blue-600" />
          </button>
        </div>
        {/* <div className="w-40 bg-transparent h-full grid gap-4">
          <div
            className=" h-full w-full flex flex-col border-shadow text-white bg-gray-600 justify-center items-center"
            onClick={handleDivClick}
          >
            <FaCloudUploadAlt className="text-7xl" />
            <p>Select A file</p>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" />
          <button
            className="flex border-shadow items-center justify-center bg-gray-800 text-white p-1 w-full h-full "
            type="button"
            onClick={handleUpload}
          >
            Upload file
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ImageUpload;
