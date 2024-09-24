import React from 'react';
import { Navbar, Footer } from '../components/Index';
import { NavLink } from 'react-router-dom';

export default function Main() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {/* white side */}
      <div className="flex-1 bg-white">
        <header>
          <h1 className='font-bold text-4xl ml-96 mt-32'>Database</h1>   
        </header>
        <div className="flex-1 ml-48">
          {/* nav buttons */}
          <NavLink to="/AddUser">
          <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-10 px-10 mx-3 mt-10 rounded focus:outline-none focus:shadow-outline">
            Add User
          </button>
          </NavLink>
          <NavLink to="/AddItem">
          <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-10 px-10 mx-3 rounded focus:outline-none focus:shadow-outline">
            Add Item
          </button>
          </NavLink>
          <NavLink to= "/ViewUsers">
          <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-10 px-10 mx-3 mt-6 rounded focus:outline-none focus:shadow-outline">
            Edit User
          </button>
          </NavLink>
        </div>
      </div>
      {/* Green side */}
      <div className="flex-1 bg-green-300"></div>
      <Footer />
    </div>
  );
}
