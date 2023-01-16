import { login, isAuthenticated } from '../api/';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toastObjDetails } from '../utils/data';

const queryString = require('query-string');
const Joi = require('joi');

export default function Authlogin() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).max(20).required(),
  });

  const { error } = schema.validate({ email, password });
  const onSubmit = (event) => {
    event.preventDefault();

    if (error) {
      toast.error(error.message, toastObjDetails);
    } else {
      login({ email, password })
        .then((data) => {
          if (data.status === 200) {
            if (data.authority) {
              navigate(`/auth-login-otp/?status=sent&id=${data.userId}`);
            } else {
              toast.error('You Are Not Authorized Person', toastObjDetails);
            }
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
          <h1 className="heading" >
            Authority
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <div className="form-login-type p-4 md:p-4" style={{ padding: '2rem 3rem' }}>
                <FontAwesomeIcon icon={faUser} className="w-16 h-20 md:w-36 md:h-48"color="#224957" />
                <h3
                  className="text-base text-white"
                  style={{ color: '#224957' }}
                >
                  Teachers
                </h3>
              </div>
            </Link>

            <div
              className="form-login-type p-4 md:p-4"
              style={{
                background: ' linear-gradient(to bottom, #155799, #159957)',
              }}
            >
              <FontAwesomeIcon icon={faUserShield} className="w-16 h-20 md:w-36 md:h-48"color="white" />
              <h3 className="text-base text-white">Authority</h3>
            </div>
          </div>

          <input
            type="email"
            onChange={handleChange('email')}
            value={email}
            placeholder="Email"
            className="input email"
          />
          <input
            onChange={handleChange('password')}
            value={password}
            type="password"
            placeholder="Password"
            className="input password"
          />

          <button
            type="submit"
            onClick={onSubmit}
            name="Login"
            className="btn--login"
          >
            Send Otp
          </button>
        </div>
      </div>
    </div>
  );
}
