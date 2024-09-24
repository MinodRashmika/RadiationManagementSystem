import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, RsTable, TableData, TableHeader} from '../components/Index'

function ViewRS () {

    const [RS, setRS] = useState([]);

    const navigate = useNavigate();

    const getRS = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await 
          axios.get('http://localhost:8070/table/rs', {
          headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },})
          .then((res) => {
            setRS(res.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };
  

    useEffect(() => {
        getRS();
    }, []);
    
    return(
        <div>
            <Navbar/>
            <div className='App-header m-auto overflow-x-auto'>
                <RsTable
                Info={{
                  asset: RS
                }}
                Title={{
                  mainTitle: "Radiation Data",
                  title: "RS Asset Data"
                }}
                />
              </div>
            <Footer/>
        </div>
    )

}

export default ViewRS;