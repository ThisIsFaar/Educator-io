import { reset, isAuthenticated } from "../../../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "../../../common/auth.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";

const queryString = require("query-string");
const Joi = require("joi");

export default function Reset() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    error: "",
    didRedirect: false,
  });

  const { email, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate({ email });

    if (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
      setValues({ ...values, error: error });
    } else {
      setValues({ error: {}, success: true });
      // setValues({ email: "", password: "", error: {}, success: true });

      reset(email)
        .then((data) => {
          if (data.status === 200) {
            toast.success(data.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        setValues({ email: "", password: "", error: {}, success: true });

          } else if (data.status === 400) {
            toast.error(data.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form">
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
          <h1 className="heading">Reset</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              className="form-login-type"
              style={{
                background: " linear-gradient(to bottom, #155799, #159957)",
                padding: "2rem 3rem",
              }}
            >
              <FontAwesomeIcon icon={faUser} size="9x" color="white" />
              <h3 className="heading--secondary">Teachers</h3>
            </div>

            <Link to="/auth-login" style={{ textDecoration: "none" }}>
              <div className="form-login-type">
                <FontAwesomeIcon
                  icon={faUserShield}
                  size="9x"
                  color="#224957"
                />
                <h3
                  className="heading--secondary "
                  style={{ color: "#224957" }}
                >
                  Admin
                </h3>
              </div>
            </Link>
          </div>

          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="input password"
          />

          <span className="box--check">
            <Link to="/register" className="check--label">
              New User? Join now!
            </Link>
          </span>
          <Link to="/login" className="forgot--pass">
            Login
          </Link>
          <button
            type="submit"
            name="Reset"
            className="btn--login"
            onClick={onSubmit}
          >
            Send Reset Password Email
          </button>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1652652790">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="custom-shape-divider-bottom-1652652900">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
