import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Reset from './pages/forgotPassword/reset';
import AuthLogin from './pages/authLogin/authLogin';
import AuthloginOtp from './pages/authLoginOtp/authLoginOtp';

// import UserDashboard from './routes/user/dashboard';

// import AuthorityDashboard from './routes/authority/dashboard';

import { isAuthenticated } from './auth/helper';
import ResetPassword from './routes/auth/resetPassword/resetPassword';
import Root from './pages/root/root';
import './main.css';
import NotFound from './pages/notFound/NotFound';
import UserDashboard from './pages/userDashboard/UserDashboard';
import AuthorityDashboard from './pages/authorityDashboard/authorityDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="reset" element={<Reset />} />
      <Route path="auth-login" element={<AuthLogin />} />
      <Route path="auth-login-otp" element={<AuthloginOtp />} />
      <Route path="reset-password-form" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/user/dashboard" element={<PrivateOutlet />}>
        <Route path="" element={<UserDashboard />} />
      </Route>
      <Route path="/authority/dashboard" element={<AuthorityOutlet />}>
        <Route path="" element={<AuthorityDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;

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
