import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Register from "./routes/auth/register/register";
import Login from "./routes/auth/login/login";
import Reset from "./routes/auth/resetPassword/reset";

import AuthLogin from "./routes/auth/authLogin/authLogin";
import AuthloginOtp from "./routes/auth/authLoginOtp/authLoginOtp";
import UserDashboard from "./routes/user/dashboard";
import AuthorityDashboard from "./routes/authority/dashboard";
import { isAuthenticated } from "./auth/helper";
import ResetPassword from "./routes/auth/resetPassword/resetPassword";
//testing
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
      <Route path="reset-password-form" element={<ResetPassword />} />

      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>404, oops, you seem to be lost</p>
          </main>
        }
      />
      <Route path="/user/dashboard" element={<PrivateOutlet />}>
        <Route path="" element={<UserDashboard />} />
      </Route>
      <Route path="/authority/dashboard" element={<AuthorityOutlet />}>
        <Route path="" element={<AuthorityDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
function PrivateOutlet() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

function AuthorityOutlet() {
  return isAuthenticated() && isAuthenticated().authority === true ? (
    <Outlet />
  ) : (
    <Navigate to="/auth-login" />
  );
}
