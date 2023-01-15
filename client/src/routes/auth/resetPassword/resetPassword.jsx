import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../../../common/auth.css';
import { resetPassword } from '../../../auth/helper';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
const queryString = require('query-string');

const Joi = require('joi');

export default function ResetPassword() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    password: '',
  });
  const { password } = values;

  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { error } = schema.validate({ password });

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
      setValues({ ...values, error: error });
    } else {
      setValues({ password: '', error: {}, success: true });

      resetPassword(id, password)
        .then((data) => {
          if (data.status === 400) {
            toast.error(data.message, {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (data.status === 200) {
            toast.success(data.message, {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const status = queryString.parse(window.location.search);
  let { id } = status;
  console.log(id);
  return (
    <div className="mainContainer bg-secondary">
      <form className="my-9 w-screen md:w-[50vw] flex justify-center flex-col items-center">
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
        <h1 className="heading">Reset Password</h1>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div
            className="form-login-type p-4 md:p-4"
            style={{
              background: ' linear-gradient(to bottom, #155799, #159957)',
            }}
          >
            <FontAwesomeIcon icon={faUser} className="w-16 h-20 md:w-36 md:h-48"color="white" />
            <h3 className="text-base text-white">Teachers</h3>
          </div>

          <Link to="/auth-login" style={{ textDecoration: 'none' }}>
            <div className="form-login-type p-4 md:p-4">
              <FontAwesomeIcon icon={faUserShield} className="w-16 h-20 md:w-36 md:h-48"color="#224957" />
              <h3 className="heading--secondary " style={{ color: '#224957' }}>
                Admin
              </h3>
            </div>
          </Link>
        </div>
        <input
          type="password"
          placeholder="Your New Password"
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
