import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <h1>Ek Landing page daal dege bas</h1>
        <Link to="/login">Get Started</Link>
      </nav>
      <Outlet />
    </div>
  );
}