import userImg from "../../../common/images/user.svg";
import { login, isAuthenticated } from "../../../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "../../../common/auth.css";
import footer from "../../../common/images/footer.svg";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
const queryString = require("query-string");
const Joi = require("joi");

export default function Authlogin() {

  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).max(20).required(),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate({ email, password });

    if (error) {
      console.log("error");
      setValues({ ...values, error: error });
    } else {
      console.log("success");
      setValues({ error: {}, success: true });
      // setValues({ email: "", password: "", error: {}, success: true });

      login({ email, password })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            console.log(data);
            navigate(`/auth-login-otp/?status=sent&id=${data.userId}`);
           
            // authenticate(data, () => {
            //   setValues({
            //     ...values,
            //     didRedirect: true,
            //   });
            // });
          
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="heading">Auth</h1>
          <img alt="" src={userImg} className="svg--teachers" />
          <img alt="" src={userImg} className="svg--admin" />
          <h3 className="heading--secondary teacher">Teachers</h3>
          <h3 className="heading--secondary admin">Admin</h3>

          
          <input type="email"
          onChange={handleChange("email")}
          value={email}
           placeholder="Email" className="input email" />
          <input
           onChange={handleChange("password")}
           value={password}
            type="password"
            placeholder="Password"
            className="input password"
          />
          {/* <span className="box--check">
            <Link to="/register" className="check--label">New User? Join now!</Link>
          </span>
            <Link to="/reset" className="forgot--pass">Forgot password?</Link> */}
            {/* <Link to="/login" className="check--label">Teachers? Login here</Link> */}

          <button type="submit"  onClick={onSubmit} name="Login" className="btn--login">
            Send Otp
          </button>
        </div>
      </div>
      <img alt="" src={footer} className="img--footer" />
    </div>
  );
}
