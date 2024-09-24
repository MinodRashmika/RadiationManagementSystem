import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer} from '../components/Index'
import Swal from 'sweetalert2';

function ViewArchive () {

    const [RS, setRS] = useState([]);
    const [RX, setRX] = useState([]);
    const [isRX, setIsRx] = useState(true)

    const getRS = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
        axios
            .get('http://localhost:8070/table/rs_archive', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the Authorization header
                },
            })
            .then((res) => {
                setRS(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    
    const getRX = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
        axios
            .get('http://localhost:8070/table/rx_archive', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the Authorization header
                },
            })
            .then((res) => {
                setRX(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    

    const confirmRestore = (ID, tableName)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "Item Will be restored to Main Tables",
        icon: 'question',
        showCancelButton: true,
        color: '#f8f9fa',
        background: '#6c757d',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Restore It!'
      })
      .then((result) => {
      if (result.isConfirmed) {
      restoreEntry(ID, tableName);
      Swal.fire({  
          icon: 'success',
          title: 'Data Successfully Restored!',
          color: '#f8f9fa',
          background: '#6c757d',
          showConfirmButton: false,
          timer: 2000
      })
      }
  })
  };

  const restoreEntry = async (tableName, ID) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const RESP = {
        TableName: tableName,
        Data: ID.toString(),
    };

    console.log(RESP);
    await axios
        .delete(`http://localhost:8070/restore`, {
            data: RESP,
            headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
        })
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            alert(err.message);
        });
};


    useEffect(() => {
        getRS();
        getRX();
    }, []);
    
    const navigate = useNavigate();

        
    return(
        <div>
            <Navbar/>
                <div className='overflow-x-auto bg-slate-700'>
                  <div className="RxArchive p-5 w-[100vw] h-[60vh] overflow-y-auto">
                      {/* table header */}
                      <div class="overflow-x-auto shadow-md sm:rounded-lg max-w-max m-auto">
                        <div class="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            <div>
                                RX Entries
                                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Radiation Data - Asset Archive</p>
                            </div>
                            <div>
                            </div>
                        </div>
                      {/* overflowing content */}
                        <table id="RxTable" class= "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                                  <th scope="col" class="px-6 py-3 w-[10vw]" >
                                      ID
                                  </th>
                                  <th scope="col" class="px-6 py-3 w-[15vw]" >
                                      Make
                                  </th>
                                  <th scope="col" class="px-6 py-3 w-[15vw]">
                                      Model
                                  </th>
                                  <th scope="col" class="px-6 py-3 w-[15vw]">
                                      Serial_No
                                  </th>
                                  <th scope="col" class="px-6 py-3 w-[15vw] hidden md:table-cell">
                                      Equipment_Use
                                  </th>
                                  <th scope="col" class="px-6 py-3 w-[15vw] hidden md:table-cell">
                                      Location
                                  </th>
                                  <th scope="col" class="px-6 py-3 w-[15vw] hidden md:table-cell">
                                      Last Seen
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                                  {RX.map((data,key) => {
                                      return(
                                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                              <th scope="row" class="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {data.id}
                                              </th>
                                              <th scope="row" class="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-13">
                                                  {data.Make}
                                              </th>
                                              <td class="px-6 py-4 items-center">
                                                  {data.Model}
                                              </td>
                                              <td class="px-6 py-4 items-center">
                                                  {data['Serial no']}
                                              </td>
                                              <td class="px-6 py-4 items-center hidden md:table-cell">
                                                  {data['Equipment use']}
                                              </td>
                                              <td class="px-6 py-4 items-center hidden md:table-cell">
                                                  {data.Location}
                                              </td>
                                              <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-xl text-sm px-3 py-2 text-center me-2 mb-2 mt-2 ml-5 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                                onClick={() => confirmRestore('RX', data.id)}
                                              >
                                                Restore
                                                </button>
                                          </tr>
                                      )
                                  })}
                  
                          </tbody>
                      </table>
                      {/* table footer */}
                      </div>
                  </div>

                  <div>
                    <div className="RsArchive p-5 w-[100vw] h-[40vh] relative">
                      <div>
                        {/* table header */}
                          <div class="overflow-x-auto shadow-md sm:rounded-lg max-w-max m-auto">
                            <div class="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                <div>
                                    RS Entires
                                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Radiation Data - Asset Archive</p>
                                </div>
                                <div>
                                </div>
                            </div>
                        {/* overflowing content */}
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                      <tr>
                                          <th scope="col" class="px-6 py-3 w-[10vw]" >
                                              ID
                                          </th>
                                          <th scope="col" class="px-6 py-3 w-[15vw]" >
                                              Isotope                        </th>
                                          <th scope="col" class="px-6 py-3 w-[15vw]">
                                              Quantity                        </th>
                                          <th scope="col" class="px-6 py-3 w-[15vw]">
                                              Form                        </th>
                                          <th scope="col" class="px-6 py-3 w-[15vw]">
                                              Purpose                        </th>
                                          <th scope="col" class="px-6 py-3 w-[15vw] hidden md:table-cell">
                                              Location                        </th>
                                          <th scope="col" class="px-6 py-3 w-[15vw] hidden md:table-cell">
                                              Last Seen
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                          
                                          {RS.map((data,key) => {
                                              return(
                                                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                          {data.id}
                                                      </th>
                                                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                          {data.Isotope}
                                                      </th>
                                                      <td class="px-6 py-4">
                                                          {data.Quantity}
                                                      </td>
                                                      <td class="px-6 py-4">
                                                          {data.Form}
                                                      </td>
                                                      <td class="px-6 py-4">
                                                          {data.Purpose}
                                                      </td>
                                                      <td class="px-6 py-4 hidden md:table-cell">
                                                          {data.Location}
                                                      </td>
                                                      <button type="button" id='restoreBtn' value={data.id} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-xl text-sm px-3 py-2 text-center me-2 mb-2 mt-2 ml-5 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                                        onClick={() => confirmRestore('RS', data.id)}
                                              >
                                                Restore
                                                </button>
                                                  </tr>
                                              )
                                          })}
                          
                                  </tbody>
                              </table>
                        {/* table footer */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            <Footer/>
        </div>
    )

}

export default ViewArchive;