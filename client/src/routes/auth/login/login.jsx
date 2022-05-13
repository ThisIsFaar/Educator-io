import "../../../common/auth.css";
import user from "../../../common/images/user.svg";
import footer from "../../../common/images/footer.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="heading">Log in</h1>
          <img src={user} className="svg--teachers" />
          <Link to="/auth-login">
          <img src={user} className="svg--admin" />
          
          </Link>
          <h3 className="heading--secondary teacher" style={{color: "blue"}}>Teachers</h3>
          <h3 className="heading--secondary admin">Admin</h3>
          <input type="email" placeholder="Email" className="input email" />
          <input
            type="password"
            placeholder="Password"
            className="input password"
          />
          <span className="box--check">
            <Link to="/register" className="check--label">New User? Join now!</Link>
          </span>
            <Link to="/reset" className="forgot--pass">Forgot password?</Link>
          <button type="submit" name="Login" className="btn--login">
            Login
          </button>
        </div>
      </div>
      <img src={footer} className="img--footer" />
    </div>
  );
}
