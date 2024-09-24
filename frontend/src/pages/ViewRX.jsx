import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, RxTable, TableData, TableHeader} from '../components/Index'

function ViewRX () {

    const [RX, setRX] = useState([]);

    const navigate = useNavigate();

    const getRX = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await 
          axios.get('http://localhost:8070/table/rx', {
          headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },})
          .then((res) => {
            setRX(res.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    useEffect(() => {
        getRX();
    }, []);
    
    return(
        <div>
            <Navbar/>
            <div className='App-header m-auto overflow-x-auto'>
                <RxTable
                Info={{
                  asset: RX
                }}
                Title={{
                  mainTitle: "Radiation Data",
                  title: "RX Asset Data"
                }}
                />
              </div>
            <Footer/>
        </div>
    )

}

export default ViewRX;