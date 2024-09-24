import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Index';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false); // State variable to track visibility of OTP input field
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8070/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login response data:', data); // Log the response data to check if token is received
      if (response.ok) {
        setShowOTP(true); // show otp after confirmed login details
        setToken(data.token); // Store token in state
        sessionStorage.setItem('token', data.token); // Store token in session storage

        console.log('Token received:', token); //testing 
        setError('');
        return token; 
      } else {
        setError(data.error || 'Login failed');
      }
      //cite chatgpt for syntax on console print
      console.log('Request:', JSON.stringify({ email, password })); // Log the request data to the console
      console.log('Response:', data); // Log the response data to the console
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('Login failed');
    }
  };
  
  

  const handleVerifyOTP = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8070/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        // OTP verified successfully, save token
        localStorage.setItem('token', token);

        navigate('/');
      } else {
        setError(data.error || 'OTP verification failed');
      }
      console.log('Request:', JSON.stringify({ email, otp })); // Log the request data to the console
      console.log('Response:', data); // Log the response data to the console
    } catch (error) {
      console.error('Error occurred during OTP verification:', error);
      setError('OTP verification failed');
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
            <h1 className="text-gray-600 text-2xl font-bold">Login</h1>
          </header>
          {/* Login Form */}
          <div className="p-10 bg-gray-300 max-w-md rounded-lg shadow-md ml-24 mr-24 mt-0">
            <div className="w-full max-w-sm mx-auto">
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
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
                />
              </div>
              {showOTP && (
                <div className="mb-6">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="otp">
                    OTP
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="otp"
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <Link to="/register" className="text-blue-500 hover:text-blue-700 text-bold">
                  Register
                </Link>
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={showOTP ? handleVerifyOTP : handleLogin} // If showOTP is true, call handleVerifyOTP, else call handleLogin
                >
                  {showOTP ? 'Verify OTP' : 'Login'} {/* Button text changes based on showOTP state */}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
