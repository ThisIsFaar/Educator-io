import userImg from "../../../common/images/user.svg";
import { login, authenticate, isAuthenticated } from "../../../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "../../../common/auth.css";
import footer from "../../../common/images/footer.svg";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
const queryString = require("query-string");
const Joi = require("joi");

{
  let status = queryString.parse(window.location.search);
  if (status.status === "verified") {
    toast.success("Successully Verified Email, Login Now", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (status.status === "error") {
    toast.error("Error in your verification", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export default function Login() {
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
            console.log(data.message);
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      // if (user && user.role === 1) {
      //   // return <Redirect to="/admin/dashboard" />;
      //   return navigate("/");
      // } else {
      //   // return <Redirect to="/user/dashboard" />;
      //   return navigate("/");
      // }
    }
    if (isAuthenticated()) {
      // return <Redirect to="/" />;
      return navigate("/user/dashboard");
    }
  };

  return (
    <div>
      <div className="container">
        <form className="form">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <h1 className="heading">Log in</h1>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="form-login-type" >
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} size="9x" color="#224957"/> 
              </Link>
              <h3 className="heading--secondary teacher" style={{color:"#224957"}}>Teachers</h3>
            </div>

            <div className="form-login-type" style={{    background:" linear-gradient(to bottom, #155799, #159957)"}}>
            <Link to="/auth-login">
              <FontAwesomeIcon icon={faUserShield} size="9x"  color="white"/>
              </Link>
              <h3 className="heading--secondary admin">Admin</h3>
            </div>
          </div>

          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            placeholder="Email"
            className="input email"
          />
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            placeholder="Password"
            className="input password"
          />
          <span className="box--check">
            <Link to="/register" className="check--label">
              New User? Join now!
            </Link>
          </span>
          <Link to="/reset" className="forgot--pass">
            Forgot password?
          </Link>
          {performRedirect()}
          <button
            type="submit"
            name="Login"
            className="btn--login"
            onClick={onSubmit}
          >
            Login
          </button>
        </form>
      </div>
      <img alt="" src={footer} className="img--footer" />
    </div>
  );
}
