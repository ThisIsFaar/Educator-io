import { verifyOtp, isAuthenticated, authenticate } from '../auth/helper';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toastObjDetails } from '../utils/data';

const queryString = require('query-string');
const Joi = require('joi');

let status = queryString.parse(window.location.search);
const { id } = status;
if (status.status === 'sent') {
  toast.success('Successully Sent OTP On Mail', toastObjDetails);
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
      toast.error(error.message, toastObjDetails);
      setValues({ ...values, error: error });
    } else {
      verifyOtp(otp, id)
        .then((data) => {
          if (data) {
            console.log(data);
            if (data.status === 200) {
              setTimeout(() => {
                navigate('/authority/dashboard');
              }, 1500);
            } else if (data.status === 400) {
              toast.error(data.message, toastObjDetails);
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
      <div className="mainContainer bg-secondary">
        <div className="my-9 w-screen md:w-[50vw] flex justify-center flex-col items-center">
          <h1 className="heading" style={{ fontSize: '4rem' }}>
            Validate Your OTP
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
