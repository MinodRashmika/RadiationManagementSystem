import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, FormEntry, Header, TableData, TableHeader} from '../components/Index'

function AddItem () {

//const to take in all the RX values
    const [rxValues, setRxValues] = useState({
      Make: '',
      Model: '',
      ['Serial no']: '',
      ['Equipment use']: '',
      Location: '',
      RSS: '',
      Custodian: '',
      ['Last Seen']: '',
      ['RC notified']: '',
      ['Spec 1']: '',
      ['Spec 2']: '',
      ['Spec 3']: '',
      ['Spec 4']: '',
      Comments: '',
    })

//function to record all the rx values being entered into the text boxes
    const handleInputChangeRX = (inputName, value) => {
      setRxValues((prevValue) => ({
        ...prevValue,
        [inputName]: value,
      }));
    };

  //const to take in all the RS values
    const [rsValues, setRsValues] = useState({
      Isotope: '',
      Quantity: '',
      Form: '',
      Purpose: '',
      Manufacturer: '',
      Model: '',
      ['Serial no']: '',
      Location: '',
      RSS: '',
      Custodian: '',
      Last_Seen: '',
      RC_Notified: '',
      Comments: '',
    })

//function to record all the rs values being entered into the text boxes
    const handleInputChangeRS = (inputName, value) => {
      setRsValues((prevValue) => ({
        ...prevValue,
        [inputName]: value,
      }));
    };
    
//checking which type of data is to be entered
    const [RXorRS, setRXorRS] = useState('RX');

    const RXorRSselect = (type) => {
      setRXorRS(type)
    }

//naviagation function after data is submitted
    const navigate = useNavigate();

    return(
        <div>
            <Navbar/>
            <div className='App-header'>
              <div className='max-w-screen-xl flex flex-row items-center justify-between'>
              {/* <----------- DIV with buttons to select form data type --------------> */}

                <Header category="Form" title ="New RX Entry"/>
                  <div className='flex space-x-4 ml-12'>
                    <button onClick={() => {
                      RXorRSselect('RX')
                    }}>
                      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add RX
                      </span>
                    </button>
                    <button onClick={() => {
                      RXorRSselect('RS')
                    }}>
                      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add RS
                      </span>
                    </button>
                  </div>
              </div>

              {/* <----------- Form to Fill RX Data --------------> */}
                  {RXorRS === 'RX' &&  <form onSubmit={async(e) => {
                    e.preventDefault();

                    const MandatoryFields = ['Make', 'Model', 'Serial no', 'Equipment use', 'Location', 'Last Seen']

                    const isValid = MandatoryFields.every(field => rxValues[field].trim() !== '')

                    let DataMinusValidations = [...Object.values(rxValues)].slice(0,-1);

                    if(isValid){
                      const newRX = {
                        TableName: 'RX',
                        Data: DataMinusValidations
                      }
                      const token = localStorage.getItem('token'); // Retrieve token from localStorage

                      await axios
                      .post('http://localhost:8070/add', newRX, {
                        headers: {
                          Authorization: `Bearer ${token}`, // Include token in the Authorization header
                        },
                      })
                      .then((res) => {
                          //showing confirmation message that data was imported
                          Swal.fire({  
                            icon: 'success',
                            title: 'Data Entry Successfully Added!',
                            color: '#f8f9fa',
                            background: '#6c757d',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        navigate('/ViewRX');
                      })
                      .catch((err)=>{
                        console.log(err);
                        alert("Conflicting RX Serial Number!")
                      })
                    } else {
                      Swal.fire({  
                        icon: 'warning',
                        title: 'Please Fill All Mandatory Fields!',
                        color: '#f8f9fa',
                        background: '#6c757d',
                        showConfirmButton: true,
                        confirmButtonColor: '#336699',
                        timer: 2000
                    })
                    }

                  }}>
                    <div className='sm:rounded-lg bg-slate-500'>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Make" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Model" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Serial no" onInputChange={handleInputChangeRX}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Equipment use" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RSS" onInputChange={handleInputChangeRX}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Custodian" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Last Seen" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RC notified" onInputChange={handleInputChangeRX}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 1" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 2" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 3" onInputChange={handleInputChangeRX}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 4" onInputChange={handleInputChangeRX}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Comments" onInputChange={handleInputChangeRX}/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
                  </form>}

              {/* <----------- Form to Fill RS Data --------------> */}

                  {RXorRS === 'RS' && <form onSubmit={async(e) => {
                    e.preventDefault();
                    const newRS = {
                      TableName: 'RS',
                      Data: Object.values(rsValues)
                    }
                    {console.log(newRS)}
                    await axios
                    .post('http://localhost:8070/add', newRS)
                    .then((res) => {
                      alert("Data Saved Successfully");
                      navigate('/ViewRS');
                    })
                    .catch((err)=>{
                      console.log(err);
                      alert("Conflicting RS Serial Number!")
                    })
                  }}>
                    <div className='sm:rounded-lg bg-slate-500'>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Isotope" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Quantity" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Form" onInputChange={handleInputChangeRS}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Purpose" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Manufacturer" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Model" onInputChange={handleInputChangeRS}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Serial no" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RSS" onInputChange={handleInputChangeRS}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Custodian" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Last_Seen" onInputChange={handleInputChangeRS}/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RC_Notified" onInputChange={handleInputChangeRS}/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Comments" onInputChange={handleInputChangeRS}/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
                  </form>}
              </div>
            <Footer/>
        </div>
    )

}

export default AddItem;