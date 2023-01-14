import { login, authenticate, isAuthenticated } from '../auth/helper';
import { Link, useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { toastObjDetails } from '../assets/data';
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
    <div className="container">
      <form className="form">
        <h1 className="heading">Log in</h1>

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
              <FontAwesomeIcon icon={faUserShield} size="9x" color="#224957" />
              <h3 className="heading--secondary " style={{ color: '#224957' }}>
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
