import "../../../common/auth.css";
import user from "../../../common/images/user.svg";
import footer from "../../../common/images/footer.svg";
import { Link } from "react-router-dom";

export default function authlogin() {
  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="heading">Log in Auth</h1>
          {/* <img alt="" src={user} className="svg--teachers" /> */}
          <img alt="" src={user} className="svg--admin" />
          {/* <h3 className="heading--secondary teacher">Teachers</h3> */}
          <h3 className="heading--secondary admin">Admin</h3>
          <input type="email" placeholder="Email" className="input email" />
          <input
            type="password"
            placeholder="Password"
            className="input password"
          />
          {/* <span className="box--check">
            <Link to="/register" className="check--label">New User? Join now!</Link>
          </span>
            <Link to="/reset" className="forgot--pass">Forgot password?</Link> */}
            <Link to="/login" className="check--label">Teachers? Login here</Link>

          <button type="submit" name="Login" className="btn--login">
            Send Otp
          </button>
        </div>
      </div>
      <img alt="" src={footer} className="img--footer" />
    </div>
  );
}
