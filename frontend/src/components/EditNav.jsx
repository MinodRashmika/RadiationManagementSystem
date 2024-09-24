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
              className={`px-32 py-4 sqaured text-lg transition duration-300 ${
                location.pathname === '/AddUser' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
              } hover:bg-gray-500 hover:text-white`}
            >
              Add Data
            </NavLink>
          </li>
          <li className="mr-0">
            <NavLink
              to="/UpdateUser"
              activeClassName="active"
              className={`px-32 py-4 sqaured text-lg transition duration-300 ${
                location.pathname === '/UpdateUser' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
              } hover:bg-gray-500 hover:text-white`}
            >
              Update Data
            </NavLink>
          </li>
          <li className="ml-0">
            <NavLink
              to="/DeleteUser"
              activeClassName="active"
              className={`px-32 py-4 sqaured text-lg transition duration-300 ${
                location.pathname === '/DeleteUser' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
              } hover:bg-gray-500 hover:text-white`}
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
