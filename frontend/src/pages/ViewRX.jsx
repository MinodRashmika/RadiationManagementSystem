import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, RxTable, TableData, TableHeader} from '../components/Index'

const ViewAll = () => {

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
            <div className='App-header'>
                <RxTable
                Headers={{
                  H1: "Make",
                  H2: "Model",
                  H3: "Serial_No",
                  H4: "Equipment_Use",
                  H5: "Location",
                  H6: "RSS",
                  H7: "Custodian",
                  H8: "Last Seen",
                  H9: "Specs 1",
                  H10: "Specs 2",
                  H11: "Specs 3",
                  H12: "Specs 4",
                  H13: "Comments"
                }}
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

export default ViewAll;