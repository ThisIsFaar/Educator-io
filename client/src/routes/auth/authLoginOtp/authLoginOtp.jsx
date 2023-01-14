import userImg from '../../../common/images/user.svg';
import { verifyOtp, isAuthenticated, authenticate } from '../../../auth/helper';
import { ToastContainer, toast } from 'react-toastify';
// import '../../../common/auth.css';
import footer from '../../../common/images/footer.svg';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';

const queryString = require('query-string');
const Joi = require('joi');

let status = queryString.parse(window.location.search);
const { id } = status;
if (status.status === 'sent') {
  toast.success('Successully Sent OTP On Mail', {
    position: 'top-center',
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
    otp: '',
    error: '',
    didRedirect: false,
  });

  const { otp, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    otp: Joi.string().min(4).max(4).required(),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate({ otp });
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
      // setValues({ error: {}, otp: "" ,success: true });
      // setValues({ email: "", password: "", error: {}, success: true });
      verifyOtp(otp, id)
        .then((data) => {
          if (data) {
            console.log(data);
            if (data.status === 200) {
              setTimeout(() => {
                navigate('/authority/dashboard');
              }, 1500);
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

            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
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
          <h1 className="heading" style={{ fontSize: '4rem' }}>
            Validate Your OTP
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <div className="form-login-type" style={{ padding: '2rem 3rem' }}>
                <FontAwesomeIcon icon={faUser} size="9x" color="#224957" />
                <h3
                  className="heading--secondary teacher"
                  style={{ color: '#224957' }}
                >
                  Teachers
                </h3>
              </div>
            </Link>

            <div
              className="form-login-type"
              style={{
                background: ' linear-gradient(to bottom, #155799, #159957)',
              }}
            >
              <FontAwesomeIcon icon={faUserShield} size="9x" color="white" />
              <h3 className="heading--secondary admin">Authority</h3>
            </div>
          </div>

          <input
            type="text"
            onChange={handleChange('otp')}
            value={otp}
            placeholder="Enter Your OTP"
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

          <button
            type="submit"
            onClick={onSubmit}
            name="Login"
            className="btn--login"
          >
            Validate and Login
          </button>
        </div>
      </div>
    </div>
  );
}
