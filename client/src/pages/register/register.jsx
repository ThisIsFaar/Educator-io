import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../common/auth.css';
import { Link } from 'react-router-dom';
import { register } from '../../auth/helper';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toastObjDetails } from '../../media/data';

const Joi = require('joi');

export default function Register() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = values;

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
      toast.error(error.message, toastObjDetails);
      setValues({ ...values });
    } else {
      register({ email, password }).then((data) => {
        setValues({ email: '', password: '' });
        if (data.status === 200) {
          toast.success(data.message, toastObjDetails);
        } else if (data.status === 400) {
          toast.error(data.message, toastObjDetails);
        }
      });
    }
  };

  return (
    <div className="container">
      <form className="form">
        <h1 className="heading">Register</h1>

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
          type="email"
          onChange={handleChange('email')}
          placeholder="Email"
          className="input email"
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="input password"
          onChange={handleChange('password')}
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
  );
}
