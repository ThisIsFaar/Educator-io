import "../../../common/auth.css";
import user from "../../../common/images/user.svg";
import footer from "../../../common/images/footer.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="heading">Reset</h1>
          
          <img alt="" src={user} className="svg--teachers" />
          {/* <img alt="" src={user} className="svg--admin" /> */}
          <h3 className="heading--secondary teacher">Teacher</h3>
          {/* <h3 className="heading--secondary admin">Admin</h3> */}
          
          <input type="email" placeholder="Email" className="input email" />
          {/* <input
            type="password"
            placeholder="Password"
            className="input password"
          /> */}
          <span className="box--check">
            <Link to="/register" className="check--label">New User? Join now!</Link>
          </span>
            <Link to="/login" className="forgot--pass">Login</Link>
          <button type="submit" name="Login" className="btn--login">
            Send Verification Email
          </button>
        </div>
      </div>
      <img alt="" src={footer} className="img--footer" />
    </div>
  );
}
