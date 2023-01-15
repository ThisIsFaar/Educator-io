import { reset, isAuthenticated } from '../auth/helper';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toastObjDetails } from '../utils/data';

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
      toast.error(error.message, toastObjDetails);
      console.log(error);
      setValues({ ...values, error: error });
    } else {
      setValues({ error: {}, success: true });

      reset(email)
        .then((data) => {
          if (data.status === 200) {
            toast.success(data.message, toastObjDetails);
            setValues({ email: '', password: '', error: {}, success: true });
          } else if (data.status === 400) {
            toast.error(data.message, toastObjDetails);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="mainContainer bg-secondary">
        <div className="my-9 w-screen md:w-[50vw] flex justify-center flex-col items-center">
          <h1 className="heading">Reset</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div
              className="form-login-type p-4 md:p-4"
              style={{
                background: ' linear-gradient(to bottom, #155799, #159957)',
              }}
            >
              <FontAwesomeIcon icon={faUser} className="w-16 h-20 md:w-36 md:h-48" color="white" />
              <h3 className="text-base text-white">Teachers</h3>
            </div>

            <Link to="/auth-login" style={{ textDecoration: 'none' }}>
              <div className="form-login-type p-4 md:p-4">
                <FontAwesomeIcon
                  icon={faUserShield}
                  className="w-16 h-20 md:w-36 md:h-48"
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
