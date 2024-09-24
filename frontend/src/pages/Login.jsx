import React, { useState } from 'react'; // Removed useEffect import
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Index';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

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
        const token = data.token; // Storing the token in a variable
        localStorage.setItem('token', token);

        console.log('Token received:', token);
        setError('');
        return token; // Return the token from the function
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('Login failed');
    }
  };
  
  

  const handleVerifyOTP = async () => {
    console.log('Verifying OTP...');
    console.log('OTP value:', otp); // Log the OTP value
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8070/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }), // Pass only the OTP value
      });
      const data = await response.json();
      if (response.ok) {
        // OTP verified successfully, save token
 
        navigate('/');
      } else {
        console.error('Error:', data.error || 'OTP verification failed');
        // Handle the error condition, such as displaying an error message to the user
      }
    } catch (error) {
      console.error('Error occurred during OTP verification:', error);
      // Handle network errors or other exceptions
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
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
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