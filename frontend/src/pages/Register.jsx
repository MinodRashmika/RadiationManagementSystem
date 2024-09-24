import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Index';

export default function Register() {
  
  const navigate = useNavigate();  //NEW CHANGE
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the form from being submitted by default

    if (!name || !email || !password || !role) {
      setError('Please fill in all fields');
      return;
    }

    // Check if the password is > 5
    if (password.length < 5) {
      setError('Password must be 5 or more characters long');
      return;
    }
    //NEW CHANGE
    // Check if the email is valid
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError('Please enter a valid email address');
      return;
    }
    
    //testing fields to match with database column names
    console.log('Fields being sent to register:', { name, email, password, role });

    try {
      const response = await fetch('http://localhost:8070/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      console.error('Error occurred during user registration:', error);

      if (response.ok) {
        navigate('/login'); // Redirect to the login page after successful registration
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      setError('Registration failed');
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-3/5 h-screen bg-green-300">
          <header className="p-24">
            <h1 className="text-black text-5xl font-bold">Radiation Management <br />Database</h1>
          </header>
          {/* green side */}
          <div className="p-8">
          </div>
        </div>
        <div className="w-2/5 bg-white">
          <header className="p-20">
            {/* White side header */}
            <h1 className="text-gray-600 text-2xl font-bold">Register</h1>
          </header>
          {/* Register Form */}
          <div className="p-10 bg-gray-300 max-w-md rounded-lg shadow-md ml-24 mr-24 mt-0">
            <div className="w-full max-w-sm mx-auto">
              <form onSubmit={handleRegister}>
                {/* Use onSubmit event handler on the form */}
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="role">
                    Role
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Radiation Safety Supervisor role">Radiation Safety Supervisor role</option>
                    <option value="Licensee role ">Licensee role </option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
              {error && <p className="text-red-500 text-lg mt-2">{error}</p>}
              {/* Apply styling to error message */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
