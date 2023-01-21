import { Outlet, Link } from 'react-router-dom';
import Lottie from "lottie-react";
import landingHero from "../utils/landingHero.json";

export default function Root() {
  return (
    <div className="flex justify-center items-center flex-col h-[90vh] w-full bg-secondary">
      <div className='h-[50vh] w-[40vh] md:w-[60vh]'>
        <Lottie animationData={landingHero} loop={true} />
      </div>
      <Link to="/login">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-secondary dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Get Started
          </span>
        </button>
      </Link>
      <Outlet />
    </div>
  );
}
