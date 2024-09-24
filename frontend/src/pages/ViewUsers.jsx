import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable'; // Import UserTable directly
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer

function ViewUsers () {

  const [users, setUserData] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const response = await 
        axios.get('http://localhost:8070/table/users', {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },})
        .then((res) => {
          setUserData(res.data);
      })
      .catch((err) => {
          alert(err.response.data.message);
      });
  };
  
  useEffect(() => {
    getUsers();
  }, []); 

  return (
    <div>
      <Navbar />
      <div className="App-header">
          <UserTable
            Headers={{ 
              H0: 'ID', 
              H1: 'Username', 
              H2: 'Email', 
              H3: 'Role' 
            }}
            Title={{
              mainTitle: "Radiation Data",
              title: "Users List"
            }}
            users={users} // Pass users as prop
          />
      </div>
      <Footer />
    </div>
  );
}

export default ViewUsers;
