import api from "../config/Base_Api";

// Login
export const loginUser = async (data) => {
  const response = await api.post("/api/login", data);
  return response.data;
};

// Register
export const registerUser = async (data) => {
  const response = await api.post("/api/register", data);
  return response.data;
};

// Verify OTP
export const verifyOtp = async (data) => {
  const response = await api.post("/api/otp-verify-code", data);
  return response.data;
};

// forgot password
export const forgotPassword = async (data) => {
  const response = await api.post("/api/forgot-password", data);
  return response.data;
};