import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./routes/auth/register/register";
import Login from "./routes/auth/login/login";
import Reset from "./routes/auth/resetPassword/reset";
import AuthLogin from "./routes/auth/authLogin/authLogin";
import AuthloginOtp from "./routes/auth/authLoginOtp/authLoginOtp";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./routes/user/dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="reset" element={<Reset />} />
      <Route path="auth-login" element={<AuthLogin />} />
      <Route path="auth-login-otp" element={<AuthloginOtp />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>404, oops, you seem to be lost</p>
          </main>
        }
      />
      <Route path="/user" element={<PrivateRoute />}>
        <Route  path="user/dashboard" element={<UserDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
