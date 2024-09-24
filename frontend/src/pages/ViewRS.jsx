import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, RsTable, TableData, TableHeader} from '../components/Index'

const ViewAll = () => {

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
            <div className='App-header'>
                <RsTable
                Headers={{
                  H0: "ID",
                  H1: "Isotope",
                  H2: "Quantity",
                  H3: "Form",
                  H4: "Purpose",
                  H5: "Manufacturer",
                  H6: "Model",
                  H7: "Serial No",
                  H8: "Location",
                  H9: "RSS",
                  H10: "Custodian",
                  H11: "Last Seen",
                  H12: "RC Notified",
                  H13: "Comments"
                }}
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

export default ViewAll;