import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

const Navbar = ({ Title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Assuming username is stored in local storage
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Deletes token and username
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove username on logout
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Radiation Management </span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/addItem" data-testid="Titles" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">{Title.Title1}</a> 
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                onClick={toggleDropdown}
                data-dropdown-toggle="dropdownNavbar"
                data-testid="Titles" 
                aria-label="Dropdown Menu Button"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                {Title.Title2}
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              {isDropdownOpen && (
                <div id="dropdownMenu" className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownButton">
                    <li>
                      <a href="/ViewRx" data-testid="Titles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{Title.SubTitle1}</a>
                    </li>
                    <li>
                      <a href="/ViewRs" data-testid="Titles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{Title.SubTitle2}</a>
                    </li>
                    <li>
                      <a href="/ViewLx" data-testid="Titles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{Title.SubTitle3}</a>
                    </li>
                    <li>
                      <a href="/ViewLs" data-testid="Titles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{Title.SubTitle4}</a>
                    </li>
                    <li>
                      <a href="/ViewRss" data-testid="Titles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{Title.SubTitle5}</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/ViewArchive" data-testid="Titles" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{Title.Title3}</NavLink>
            </li>
            <li>
              <NavLink to="/ImportData" data-testid="Titles" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{Title.Title4}</NavLink>
            </li>
            <li>
              <NavLink to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={toggleProfileDropdown}>
                {username || Title.Title5}
              </NavLink>
              {isProfileDropdownOpen && (
                <div className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow mt-1 w-40 dark:bg-gray-700 dark:divide-gray-600">
                  <NavLink to="/Login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Logout</NavLink>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  Title: {
    Title1: 'Add New',
    Title2: "View Data",
    Title3: "Archives",
    Title4: "Import Data",
    Title5: "Profile",
    SubTitle1: "RX Tables",
    SubTitle2: "RS Tables",
    SubTitle3: "LX Tables",
    SubTitle4: "LS Tables",
    SubTitle5: "RSS Tables",
  }
}

export default Navbar;
