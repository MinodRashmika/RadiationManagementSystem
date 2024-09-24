import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navbar, Footer, FormEntry, Header } from '../components/Index';

function AddUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');


  const handleInputChange = (inputName, value) => {
    if (inputName === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);// cited chatgpt on regex
      setEmailError(isValidEmail ? '' : 'Invalid email');
    } else if (inputName === 'password') {
      setPasswordError(value.length >= 5 ? '' : 'Password must be at least 5 characters long');
    } else if (inputName === 'role') {
      setRoleError(value ? '' : 'Role is required');
    }

    setUserData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passwordError || !userData.role) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.post('http://localhost:8070/register', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'User registered successfully!',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/ViewUsers');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: 'Failed to register user',
        });
      }
    } catch (error) {
      console.error('Error occurred during user registration:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: 'Failed to register user',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="App-header">
        <div className="max-w-screen-xl flex flex-row items-center justify-between">
          <Header category="Form" title="New User Entry" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="sm:rounded-lg bg-slate-500">
            <div className="flex items-stretch py-5">
              <div className="px-4">
                <FormEntry
                  Name="name"
                  onInputChange={handleInputChange}
                  Label="Username"
                  required
                />
              </div>
              <div className="px-4">
                <FormEntry
                  Name="email"
                  onInputChange={handleInputChange}
                  Label="Email"
                  type="email"
                  required
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              <div className="px-4">
                <FormEntry
                  Name="password"
                  onInputChange={handleInputChange}
                  Label="Password"
                  type="password"
                  required
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
            </div>
            <div className="flex items-stretch py-5">
              <div className="px-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-400 text-white text-sm" // Reduced padding and font size
                  value={userData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Radiation Safety Officer role">Radiation Safety Officer</option>
                  <option value="Radiation Safety Supervisor role">Radiation Safety Supervisor</option>
                  <option value="Licensee role">Licensee</option>
                  <option value="Nobody User role">Nobody User </option>
                </select>
                {roleError && <p className="text-sm text-red-500">{roleError}</p>}
              </div>
            </div>

          </div>
          <div className="Buttons mt-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5"
            >
              Register
            </button>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddUser;
