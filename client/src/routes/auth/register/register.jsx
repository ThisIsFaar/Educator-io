import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../common/auth.css";
import user from "../../../common/images/user.svg";
import footer from "../../../common/images/footer.svg";
import { Link } from "react-router-dom";
import { register } from "../../../auth/helper";
import { useState } from "react";
const Joi = require("joi");

export default function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: {},
    success: false,
  });
  const { email, password, error } = values;

  // useEffect(() => {
  //   console.log("test");
  // },[error])

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).max(20).required(),
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { error } = schema.validate({ email, password });

    if (error) {
      console.log("error");
      setValues({ ...values, error: error });
      // eslint-disable-next-line
      {
        toast.error(`${error.message}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      setValues({ email: "", password: "", error: {}, success: true });
      

      register({ email, password })
        .then((data) => {
          if (data.status === 200) {
            console.log(data.message);
            toast.success(data.message, {
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

    // if (error) {
    //   setValues({error});
    // } else {
    //   setValues({error: ""})
    // }
    // console.log(error);
  };

  const successMessage = () => {
    // return (
    //   <div
    //     className="alert alert-success"
    //     style={{ display: success ? "" : "none" }}
    //   >
    //     Email sent
    //     <Link to="/login">Login Here</Link>
    //   </div>
    // );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error.message !== "" ? "block" : "none" }}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <form className="form">
          <h1 className="heading">Register</h1>
          <img alt="" src={user} className="svg--teachers" />
          <img alt="" src={user} className="svg--admin" />
          <h3 className="heading--secondary teacher">Teachers</h3>
          <h3 className="heading--secondary admin">Admin</h3>
          {successMessage()}
          {errorMessage()}
          <input
            type="email"
            onChange={handleChange("email")}
            placeholder="Email"
            className="input email"
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="input password"
            onChange={handleChange("password")}
            value={password}
          />

          <span className="box--check">
            <Link to="/login" className="check--label">
              Already account? Login now!
            </Link>
          </span>
          <br />
          <button
            type="submit"
            name="Login"
            className="btn--login"
            onClick={onSubmit}
          >
            Register
          </button>
        </form>
      </div>
      <img alt="" src={footer} className="img--footer" />
    </div>
  );
}
