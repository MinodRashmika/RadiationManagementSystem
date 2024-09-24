import React, { useState, useEffect } from 'react';
import { Navbar, Footer, FormEntry, Header } from '../components/Index';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

function UpdateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state ? location.state.userData : {};

  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showError, setShowError] = useState(false);
  const [roleError, setRoleError] = useState('');
  const [selectedRole, setSelectedRole] = useState(userData.role);

  const generateHash = async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      console.error('Error generating hash:', error);
      throw error;
    }
  };

  const PasswordInputChange = async (inputName, value) => {
    // Validate password length
    if (value.length < 5) {
      setPasswordError('Password must be at least 5 characters long.');
    } else {
      setPasswordError('');
    }
  
    // Hash the password
    const hashedPassword = await generateHash(value);
  
    // Update the updatedUserData state with the hashed password
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [inputName]: hashedPassword, // Set the hashed password instead of the plain text password
    }));
  };

  const handleInputChange = (inputName, value) => {
    if (inputName === 'email') {
      // Validate email format
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        setEmailError('Invalid email');
      } else {
        setEmailError('');
      }
    } else if (inputName === 'password') {
      // Validate password length
      if (value.length < 5) {
        setPasswordError('Password must be at least 5 characters');
      } else {
        setPasswordError('');
      }
    } else if (inputName === 'role') {
      // Set the selected role
      setSelectedRole(value);
    }

    setUpdatedUserData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    // Check if there are any email or password errors
    if (emailError || passwordError) {
      setShowError(true);
      return; // Exit early if there are errors
    }
  
    let editedUserData = {
      TableName: 'users',
      Data: Object.entries(userData)
        .filter(([key, value]) => key.startsWith('id'))
        .map(([key, value]) => value.toString()),
      NewData: Object.values(updatedUserData).slice(1),
    };
  
    console.log('Data being edited:', editedUserData);
  
    // Get the token from wherever you store it, for example, from localStorage
    const token = localStorage.getItem('token');
  
    // Send data to backend to edit
    try {
      await axios.put('http://localhost:8070/editData', editedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User data edited successfully!');
      navigate('/ViewUsers');
    } catch (error) {
      console.error('Error editing user data:', error);
      // Handle error
    }
  };

  useEffect(() => {
    console.log('Updated User Data:', updatedUserData);
  }, [updatedUserData]);

  return (
    <div>
      <Navbar />
      <div className="App-header">
        <div className="max-w-screen-xl flex flex-row items-center justify-between">
          <Header category="Form" title="Update User" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="sm:rounded-lg bg-slate-500">
            <div className="flex items-stretch py-5">
              <div className="px-4">
                <FormEntry
                  Name="name"
                  onInputChange={handleInputChange}
                  Label={`Username: ${userData.name}`}
                  value={updatedUserData.name}
                />
              </div>
              <div className="px-4">
                <FormEntry
                  Name="email"
                  onInputChange={handleInputChange}
                  Label={`Email: ${userData.email}`}
                  value={updatedUserData.email}
                />
                {showError && emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              <div className="px-4">
                <FormEntry
                  Name="password"
                  onInputChange={PasswordInputChange}
                  Label="Password: *******"
                  placeholder="Enter new password"
                  value={updatedUserData.password}
                />
                {showError && passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
            </div>
            <div className="flex items-stretch py-5">
            <select
              id="role"
              name="role"
              className="mt-1 block w-48 py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-400 text-white text-sm" 
              value={selectedRole}
              onChange={(e) => handleInputChange('role', e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Radiation Safety Officer role">Radiation Safety Officer</option>
              <option value="Radiation Safety Supervisor role">Radiation Safety Supervisor</option>
              <option value="Licensee role">Licensee</option>
              <option value="Nobody User ">Nobody User </option>
            </select>
            {showError && roleError && <p className="text-sm text-red-500">{roleError}</p>}
            </div>
          </div>
          <div className="Buttons mt-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5"
            >
              Update
            </button>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5"
              onClick={() => navigate('/ViewUsers')}
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

export default UpdateUser;
