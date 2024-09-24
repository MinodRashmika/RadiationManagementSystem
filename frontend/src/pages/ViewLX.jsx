import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, LxTable, TableData, TableHeader} from '../components/Index'

function ViewLX () {

    const [LX, setLX] = useState([]);

    const navigate = useNavigate();

    const getLX = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await 
          axios.get('http://localhost:8070/table/lx', {
          headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },})
          .then((res) => {
            setLX(res.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };
  

    useEffect(() => {
        getLX();
    }, []);
    
    return(
        <div>
            <Navbar/>
            <div className='App-header m-auto overflow-x-auto'>
                <LxTable
                Info={{
                  asset: LX
                }}
                Title={{
                  mainTitle: "Radiation Data",
                  title: "LX Data"
                }}
                />
              </div>
            <Footer/>
        </div>
    )

}

export default ViewLX;