import userImg from "../../../common/images/user.svg";
import { verifyOtp, isAuthenticated } from "../../../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "../../../common/auth.css";
import footer from "../../../common/images/footer.svg";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
const queryString = require("query-string");
const Joi = require("joi");

let status = queryString.parse(window.location.search);
const { id } = status;
if (status.status === "sent") {
  toast.success("Successully Send OTP On Mail", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export default function AuthloginOtp() {
  let status = queryString.parse(window.location.search);
const { id } = status;

  let navigate = useNavigate();

  const [values, setValues] = useState({
    otp: "",
    error: "",
    didRedirect: false,
  });

  const { otp, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    otp: Joi.string().max(4).max(4).required(),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate({ otp });
    if (error) {
      console.log("error");
      setValues({ ...values, error: error });
    } else {
      // setValues({ error: {}, otp: "" ,success: true });
      // setValues({ email: "", password: "", error: {}, success: true });
      verifyOtp(otp, id )
      .then((data) => {
          console.log("response");
          if (data) {
            console.log(data);
            navigate("/authority/dashboard");

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
          <h1 className="heading">Enter OTP</h1>
          {/* <img src={user} alt="" className="svg--teachers" /> */}
          <img src={userImg} alt="" className="svg--admin" />
          {/* <h3 className="heading--secondary teacher">Teachers</h3> */}
          <h3 className="heading--secondary admin">Admin</h3>
          <input
            type="text"
            onChange={handleChange("otp")}
            value={otp}
            placeholder="Otp"
            className="input email"
          />
          {/* <input
            type="password"
            placeholder="Password"
            className="input password"
          /> */}
          {/* <span className="box--check">
            <Link to="/register" className="check--label">New User? Join now!</Link>
          </span>
            <Link to="/reset" className="forgot--pass">Forgot password?</Link> */}
          <Link to="/login" className="check--label">
            Teachers? Login here
          </Link>

          <button type="submit" onClick={onSubmit} name="Login" className="btn--login">
            Validate and Login
          </button>
        </div>
      </div>
      <img src={footer} alt="" className="img--footer" />
    </div>
  );
}
