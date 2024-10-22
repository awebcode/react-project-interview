import Login from "./Login";
import Register from "./Register";
import VerifyOTP from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";
import UserProfile from "./UserProfile";
export const AuthRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
];
//   Ending auth
