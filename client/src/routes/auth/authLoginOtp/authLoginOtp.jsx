import "../../../common/auth.css";
import user from "../../../common/images/user.svg";
import footer from "../../../common/images/footer.svg";
import { Link } from "react-router-dom";

export default function authloginOtp() {
  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="heading">Enter OTP</h1>
          {/* <img src={user} className="svg--teachers" /> */}
          <img src={user} className="svg--admin" />
          {/* <h3 className="heading--secondary teacher">Teachers</h3> */}
          <h3 className="heading--secondary admin">Admin</h3>
          <input type="email" placeholder="Otp" className="input email" />
          {/* <input
            type="password"
            placeholder="Password"
            className="input password"
          /> */}
          {/* <span className="box--check">
            <Link to="/register" className="check--label">New User? Join now!</Link>
          </span>
            <Link to="/reset" className="forgot--pass">Forgot password?</Link> */}
            <Link to="/login" className="check--label">Teachers? Login here</Link>

          <button type="submit" name="Login" className="btn--login">
            Validate and Login
          </button>
        </div>
      </div>
      <img src={footer} className="img--footer" />
    </div>
  );
}
