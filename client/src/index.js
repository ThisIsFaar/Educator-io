import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Toast from './component/Toast/Toast';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Navbar />
      <Toast />
      {/* <App /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  </>
);
