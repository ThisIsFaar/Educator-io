import { Link } from 'react-router-dom';
import './NotFound.css';
const NotFound = () => {
  return (
    <main className="notfound-main">
      <p>404, oops, you seem to be lost</p>
      <Link to="/">Go To HomePage</Link>
    </main>
  );
};

export default NotFound;
