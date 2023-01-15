import { login, authenticate, isAuthenticated } from '../api/';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { toastObjDetails } from '../utils/data';
import '../css/auth.css';
const queryString = require('query-string');
const Joi = require('joi');

export default function Login() {
  let navigate = useNavigate();
  let status = queryString.parse(window.location.search);
  if (status.status === 'verified') {
    toast.success('Successully Verified Email, Login Now', toastObjDetails);
  }
  if (status.status === 'signout') {
    toast.info('Successully Signout', toastObjDetails);
  }
  if (status.status === 'error') {
    toast.error('Error in your verification', toastObjDetails);
  }

  const [values, setValues] = useState({
    email: '',
    password: '',
    didRedirect: false,
  });

  const { email, password, didRedirect } = values;

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
      toast.error(`${error.message}`, toastObjDetails);
    } else {
      login({ email, password })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          } else if (data.status === 400) {
            toast.error(data.message, toastObjDetails);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return navigate('/user/dashboard');
    }
  };

  return (
    <div className="mainContainer bg-secondary">
      <form className="my-9 w-screen md:w-[50vw] flex justify-center flex-col items-center">
        <h1 className="heading">Log in</h1>

        <div className='flex justify-around '>
          <div
            className="form-login-type p-4 md:p-4 "
            style={{
              background: ' linear-gradient(to bottom, #155799, #159957)',
            }}
          >
            <FontAwesomeIcon icon={faUser} className=' w-16 h-20 md:w-36 md:h-48' color="white" />
            <h3 className="text-base text-white">Teachers</h3>
          </div>

          <Link to="/auth-login" style={{ textDecoration: 'none' }}>
            <div className="form-login-type p-4 md:p-4 ">
              <FontAwesomeIcon icon={faUserShield} className='w-16 h-20 md:w-36 md:h-48' color="#224957" />
              <h3 className="text-base text-white" style={{ color: '#224957' }}>
                Admin
              </h3>
            </div>
          </Link>
        </div>

        <input
          onChange={handleChange('email')}
          value={email}
          type="email"
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
  );
}
