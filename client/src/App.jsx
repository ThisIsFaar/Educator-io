import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Reset from './pages/reset';
import AuthLogin from './pages/authLogin';
import AuthloginOtp from './pages/authLoginOtp';
import { isAuthenticated } from './api';
import Root from './pages/root';
import NotFound from './pages/NotFound';
import UserDashboard from './pages/userDashboard/UserDashboard';
import AuthorityDashboard from './pages/authorityDashboard/authorityDashboard';
import ResetPassword from './pages/resetPassword';

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
