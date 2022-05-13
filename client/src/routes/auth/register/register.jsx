import "../../../common/auth.css";
import user from "../../../common/images/user.svg";
import footer from "../../../common/images/footer.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="heading">Register</h1>
          <img src={user} className="svg--teachers" />
          {/* <img src={user} className="svg--admin" /> */}
          <h3 className="heading--secondary teacher">Teachers</h3>
          {/* <h3 className="heading--secondary admin">Admin</h3> */}
          <input type="email" placeholder="Email" className="input email" />
          <input
            type="password"
            placeholder="Password"
            className="input password"
          />
          <span className="box--check">
            <Link to="/login" className="check--label">Already account? Login now!</Link>
          </span>
          <br />
          <button type="submit" name="Login" className="btn--login">
            Register
          </button>
        </div>
      </div>
      <img src={footer} className="img--footer" />
    </div>
  );
}
