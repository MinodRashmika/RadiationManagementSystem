import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, LsTable, TableData, TableHeader} from '../components/Index'

function ViewLS () {

    const [LS, setLS] = useState([]);

    const navigate = useNavigate();

    const getLS = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await 
          axios.get('http://localhost:8070/table/ls', {
          headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },})
          .then((res) => {
            setLS(res.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };
  

    useEffect(() => {
        getLS();
    }, []);
    
    return(
        <div>
            <Navbar/>
            <div className='App-header m-auto overflow-x-auto'>
                <LsTable
                Info={{
                  asset: LS
                }}
                Title={{
                  mainTitle: "Radiation Data",
                  title: "LS Data"
                }}
                />
              </div>
            <Footer/>
        </div>
    )

}

export default ViewLS;