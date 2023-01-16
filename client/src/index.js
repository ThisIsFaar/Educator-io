import ReactDOM from 'react-dom/client';
import './css/main.css';
import App from './App';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Toast from './component/Toast/Toast';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Navbar />
      <Toast />
      <App />
      <Footer />
    </BrowserRouter>
  </>
);
