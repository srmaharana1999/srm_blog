import { NextResponse } from "next/server";

// Define a generic interface for API response shape
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  status?: number;
}

// Restrict common HTTP status codes
export type StatusCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 429
  | 500
  | 502
  | 503
  | 504;

export function responseJson<T>(
  payload: Omit<ApiResponse<T>, "status"> & { status?: StatusCode } = {
    success: true,
  },
  status: StatusCode = 200
) {
  // Ensure status code sync
  const response: ApiResponse<T> = {
    success: payload.success,
    message: payload.message,
    data: payload.data,
    error: payload.error,
    status: status,
  };

  return NextResponse.json(response, { status });
}

// // Success response with data
// return responseJson({ success: true, data: { id: 123, name: "John" } });

// // Success response with message only
// return responseJson({ success: true, message: "Operation successful" });

// // Error response with message and status
// return responseJson({ success: false, error: "Invalid input" }, 400);
