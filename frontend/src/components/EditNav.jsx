// EditNav.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const EditNav = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center items-center h-full mt-2">
      <nav>
        <ul className="flex">
          <li className="mr-0">
            <NavLink
              to="/AddUser"
              activeClassName="active"
              className={`px-32 py-4 sqaured text-lg ${
                location.pathname === '/add' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
              }`}
            >
              Add Data
            </NavLink>
          </li>
          <li className="mr-0">
            <NavLink
              to="/UpdateUser"
              activeClassName="active"
              className={`px-32 py-4 sqaured text-lg ${
                location.pathname === '/update' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
              }`}
            >
              Update Data
            </NavLink>
          </li>
          <li className="ml-0">
            <NavLink
              to="/DeleteUser"
              activeClassName="active"
              className={`px-32 py-4 sqaured text-lg ${
                location.pathname === '/delete' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
              }`}
            >
              Delete Data
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default EditNav;
