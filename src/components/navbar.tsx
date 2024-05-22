import { useState } from 'react';
import '../style.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={require("../assets/fixmi-logo.png")} className="h-8" alt="FixMi" />
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className={`w-full md:flex md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-default">
          <ul className="font-large flex flex-col items-center md:items-start p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <a href="#" className="block py-2 px-3 rounded dark:hover:bg-gray-700 dark:hover:text-white bg-blue-200 text-blue-800">
                Riparazione
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded dark:hover:bg-gray-700 dark:hover:text-white bg-green-200 text-green-800">
                Assistenza
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded dark:hover:bg-gray-700 dark:hover:text-white bg-red-200 text-red-800">
                Negozio
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded dark:hover:bg-gray-700 dark:hover:text-white bg-purple-200 text-purple-800">
                Magazzino
              </a>
            </li>
            <li>
              <a href="/auth" className="block py-2 px-3 rounded dark:hover:bg-gray-700 dark:hover:text-white bg-yellow-200 text-yellow-800">
                Profilo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

