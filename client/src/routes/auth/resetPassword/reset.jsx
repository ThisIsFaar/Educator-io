import { reset, isAuthenticated } from '../../../auth/helper';
import { ToastContainer, toast } from 'react-toastify';
import '../../../common/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';

const queryString = require('query-string');
const Joi = require('joi');

export default function Reset() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    error: '',
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
        position: 'bottom-center',
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
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setValues({ email: '', password: '', error: {}, success: true });
          } else if (data.status === 400) {
            toast.error(data.message, {
              position: 'bottom-center',
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
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div
              className="form-login-type"
              style={{
                background: ' linear-gradient(to bottom, #155799, #159957)',
                padding: '2rem 3rem',
              }}
            >
              <FontAwesomeIcon icon={faUser} size="9x" color="white" />
              <h3 className="heading--secondary">Teachers</h3>
            </div>

            <Link to="/auth-login" style={{ textDecoration: 'none' }}>
              <div className="form-login-type">
                <FontAwesomeIcon
                  icon={faUserShield}
                  size="9x"
                  color="#224957"
                />
                <h3
                  className="heading--secondary "
                  style={{ color: '#224957' }}
                >
                  Admin
                </h3>
              </div>
            </Link>
          </div>

          <input
            onChange={handleChange('email')}
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
    </div>
  );
}
