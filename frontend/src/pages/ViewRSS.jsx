import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, Rss_Table, TableData, TableHeader} from '../components/Index'

function ViewRSS () {

    const [RSS, setRSS] = useState([]);

    const navigate = useNavigate();

    const getRSS = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await 
          axios.get('http://localhost:8070/table/rss', {
          headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },})
          .then((res) => {
            setRSS(res.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };
  

    useEffect(() => {
        getRSS();
    }, []);
    
    return(
        <div>
            <Navbar/>
            <div className='App-header m-auto overflow-x-auto'>
                <Rss_Table
                Info={{
                  asset: RSS
                }}
                Title={{
                  mainTitle: "Radiation Data",
                  title: "RSS Data"
                }}
                />
              </div>
            <Footer/>
        </div>
    )

}

export default ViewRSS;