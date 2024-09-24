import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import {Navbar, Footer, FormEntry, Header, TableData, TableHeader} from '../components/Index'
import Swal from 'sweetalert2';

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

      validation: {
      Make: false,
      Model: false,
      ['Serial no']: false,
      ['Equipment use']: false,
      Location: false,
      ['Last Seen']: false,
    }
    })

//function to record all the rx values being entered into the text boxes
    const handleInputChangeRX = (inputName, value) => {
      setRxValues((prevValue) => ({
        ...prevValue,
        [inputName]: value,
        validation: {
          ...prevValue.validation,
          [inputName]:value.trim() !== '',
        }
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

      validation: {
        Isotope: false,
        Quantity: false,
        Form: false,
        Location: false,
        Last_Seen: false,
      }
    })


//function to record all the rs values being entered into the text boxes
const handleInputChangeRS = (inputName, value) => {
  setRsValues((prevValue) => ({
    ...prevValue,
    [inputName]: value,
    validation: {
      ...prevValue.validation,
      [inputName]:value.trim() !== '',
    }
  }));
};

    //const to take in all the LX values
    const [lxValues, setLxValues] = useState({
      ['Name (first)']: '',
      ['Name (last)']: '',
      Email: '',
      Phone: '',
      Location: '',
      ['License no']: '',
      ['Sequence no']: '',
      Expiry: '',
      Purposes: '',
      RSS: '',
      Comments: '',

      validation: {
        ['Name (first)']: false,
        ['Name (last)']: false,
        Email: false,
        Phone: false,
        ['License no']: false,
      }
    })


//function to record all the lx values being entered into the text boxes
const handleInputChangeLX = (inputName, value) => {
  setLxValues((prevValue) => ({
    ...prevValue,
    [inputName]: value,
    validation: {
      ...prevValue.validation,
      [inputName]:value.trim() !== '',
    }
  }));
};

    //const to take in all the LS values
    const [lsValues, setLsValues] = useState({
      ['Name (first)']: '',
      ['Name (last)']: '',
      Email: '',
      Phone: '',
      Location: '',
      ['License no']: '',
      ['Sequence no']: '',
      Expiry: '',
      Purposes: '',
      RSS: '',
      Comments: '',

      validation: {
        ['Name (first)']: false,
        ['Name (last)']: false,
        Email: false,
        Phone: false,
        ['License no']: false,
      }
    })


//function to record all the ls values being entered into the text boxes
const handleInputChangeLS = (inputName, value) => {
  setLsValues((prevValue) => ({
    ...prevValue,
    [inputName]: value,
    validation: {
      ...prevValue.validation,
      [inputName]:value.trim() !== '',
    }
  }));
};

    //const to take in all the RSS values
    const [rssValues, setRssValues] = useState({
      Name: '',
      Email: '',
      Phone: '',
      Location: '',
      School: '',
      ['Head of School']: '',
      Purposes: '',

      validation: {
        Name: false,
        Email: false,
        Phone: false,
      }
    })

//function to record all the rss values being entered into the text boxes
const handleInputChangeRSS = (inputName, value) => {
  setRssValues((prevValue) => ({
    ...prevValue,
    [inputName]: value,
    validation: {
      ...prevValue.validation,
      [inputName]:value.trim() !== '',
    }
  }));
};

//checking which type of data is to be entered
    const [EntryDataType, setEntryDataType] = useState('RX');

    const SelectDataType = (type) => {
      setEntryDataType(type)
    }

//naviagation function after data is submitted
    const navigate = useNavigate();

    return(
        <div>
            <Navbar/>
            <div className='App-header'>
              <div className='max-w-screen-xl flex flex-row items-center justify-between'>
              {/* <----------- DIV with buttons to select form data type --------------> */}

                <Header category="Form" title ={`New ${EntryDataType} Entry`}/>
                  <div className='flex space-x-4 ml-12'>
                    <button className='mb-3' onClick={() => {
                      SelectDataType('RX')
                    }}>
                      <span class="relative px-1 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-3xl">
                        Add RX
                      </span>
                    </button>
                    <button className='mb-3' onClick={() => {
                      SelectDataType('RS')
                    }}>
                      <span class="relative px-1 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-3xl">
                        Add RS
                      </span>
                    </button>
                    <button className='mb-3' onClick={() => {
                      SelectDataType('LS')
                    }}>
                      <span class="relative px-1 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-3xl">
                        Add LS
                      </span>
                    </button>
                    <button className='mb-3' onClick={() => {
                      SelectDataType('LX')
                    }}>
                      <span class="relative px-1 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-3xl">
                        Add LX
                      </span>
                    </button>
                    <button className='mb-3' onClick={() => {
                      SelectDataType('RSS')
                    }}>
                      <span class="relative px-1 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-3xl">
                        Add RSS
                      </span>
                    </button>
                  </div>
              </div>

              {/* <----------- Form to Fill RX Data --------------> */}
                  {EntryDataType === 'RX' &&  <form onSubmit={async(e) => {
                    e.preventDefault();

                    const MandatoryFields = ['Make', 'Model', 'Serial no', 'Equipment use', 'Location', 'Last Seen']

                    const isValid = MandatoryFields.every(field => rxValues[field].trim() !== '')

                    let DataMinusValidationsRX = [...Object.values(rxValues)].slice(0,-1);

                    if(isValid){
                      const newRX = {
                        TableName: 'RX',
                        Data: DataMinusValidationsRX
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
                              <FormEntry Name= "Make" onInputChange={handleInputChangeRX} Label= "Make *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Model" onInputChange={handleInputChangeRX} Label= "Model *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Serial no" onInputChange={handleInputChangeRX} Label= "Serial Number *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Equipment use" onInputChange={handleInputChangeRX} Label= "Equipment Use *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeRX} Label= "Location *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RSS" onInputChange={handleInputChangeRX} Label= "RSS"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Custodian" onInputChange={handleInputChangeRX} Label= "Custodian"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Last Seen" onInputChange={handleInputChangeRX} Label= "Last Seen *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RC notified" onInputChange={handleInputChangeRX} Label= "RC Notified"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 1" onInputChange={handleInputChangeRX} Label= "Specification 1"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 2" onInputChange={handleInputChangeRX} Label= "Specification 2"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 3" onInputChange={handleInputChangeRX} Label= "Specification 3"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Spec 4" onInputChange={handleInputChangeRX} Label= "Specification 4"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Comments" onInputChange={handleInputChangeRX} Label= "Comments"/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
                  </form>}

              {/* <----------- Form to Fill RS Data --------------> */}

                  {EntryDataType === 'RS' && <form onSubmit={async(e) => {
                    e.preventDefault();

                    const MandatoryFields = ['Isotope', 'Quantity', 'Form', 'Location', 'Last_Seen']

                    const isValid = MandatoryFields.every(field => rsValues[field].trim() !== '')

                    let DataMinusValidationsRS = [...Object.values(rsValues)].slice(0,-1);

                    if(isValid){
                      const newRS = {
                        TableName: 'RS',
                        Data: DataMinusValidationsRS
                      }


                      const token = localStorage.getItem('token'); // Retrieve token from localStorage
                      
                      await axios
                      .post('http://localhost:8070/add', newRS, {
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
                        navigate('/ViewRS');
                      })
                      .catch((err)=>{
                        console.log(err);
                        alert("Conflicting RS Serial Number!")
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
                              <FormEntry Name= "Isotope" onInputChange={handleInputChangeRS} Label = "Isotope *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Quantity" onInputChange={handleInputChangeRS} Label = "Quantity *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Form" onInputChange={handleInputChangeRS} Label = "Form *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Purpose" onInputChange={handleInputChangeRS} Label = "Purpose"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Manufacturer" onInputChange={handleInputChangeRS} Label = "Manufacturer"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Model" onInputChange={handleInputChangeRS} Label = "Model"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Serial no" onInputChange={handleInputChangeRS} Label = "Serial Number"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeRS} Label = "Location *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RSS" onInputChange={handleInputChangeRS} Label = "RSS"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Custodian" onInputChange={handleInputChangeRS} Label = "Custodian"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Last_Seen" onInputChange={handleInputChangeRS} Label = "Last Seen *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "RC_Notified" onInputChange={handleInputChangeRS} Label = "RC Notified"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Comments" onInputChange={handleInputChangeRS} Label = "Comments"/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
              </form>}

              {/* <----------- Form to Fill LS Data --------------> */}

              {EntryDataType === 'LS' && <form onSubmit={async(e) => {
                    e.preventDefault();

                    const MandatoryFields = ['Name (first)','Name (last)','Email','License no']

                    const isValid = MandatoryFields.every(field => lsValues[field].trim() !== '')

                    let DataMinusValidationsLS = [...Object.values(lsValues)].slice(0,-1);

                    if(isValid){
                      const newLS = {
                        TableName: 'LS',
                        Data: DataMinusValidationsLS
                      }


                      const token = localStorage.getItem('token'); // Retrieve token from localStorage
                      
                      await axios
                      .post('http://localhost:8070/add', newLS, {
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
                        navigate('/ViewLS');
                      })
                      .catch((err)=>{
                        console.log(err);
                        alert("Conflicting LS License Number!")
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
                              <FormEntry Name= "Name (first)" onInputChange={handleInputChangeLS} Label = "First Name *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Name (last)" onInputChange={handleInputChangeLS} Label = "Last Name *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Email" onInputChange={handleInputChangeLS} Label = "Email *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Phone" onInputChange={handleInputChangeLS} Label = "Phone No."/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeLS} Label = "Location"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "License no" onInputChange={handleInputChangeLS} Label = "License No. *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Sequence no" onInputChange={handleInputChangeLS} Label = "Sequence No."/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Expiry" onInputChange={handleInputChangeLS} Label = "Expiry"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Purposes" onInputChange={handleInputChangeLS} Label = "Purposes"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "RSS" onInputChange={handleInputChangeLS} Label = "RSS"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Comments" onInputChange={handleInputChangeLS} Label = "Comments"/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
              </form>}

              {/* <----------- Form to Fill LX Data --------------> */}

              {EntryDataType === 'LX' && <form onSubmit={async(e) => {
                    e.preventDefault();

                    const MandatoryFields = ['Name (first)','Name (last)','Email','License no']

                    const isValid = MandatoryFields.every(field => lxValues[field].trim() !== '')

                    let DataMinusValidationsLX = [...Object.values(lxValues)].slice(0,-1);


                    if(isValid){
                      const newLX = {
                        TableName: 'LX',
                        Data: DataMinusValidationsLX
                      }
                      const token = localStorage.getItem('token'); // Retrieve token from localStorage
                      
                      await axios
                      .post('http://localhost:8070/add', newLX, {
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
                        navigate('/ViewLX');
                      })
                      .catch((err)=>{
                        console.log(err);
                        alert("Conflicting LX License Number!")
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
                              <FormEntry Name= "Name (first)" onInputChange={handleInputChangeLX} Label = "First Name *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Name (last)" onInputChange={handleInputChangeLX} Label = "Last Name *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Email" onInputChange={handleInputChangeLX} Label = "Email *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Phone" onInputChange={handleInputChangeLX} Label = "Phone No."/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeLX} Label = "Location"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "License no" onInputChange={handleInputChangeLX} Label = "License No. *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "Sequence no" onInputChange={handleInputChangeLX} Label = "Sequence No."/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Expiry" onInputChange={handleInputChangeLX} Label = "Expiry"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Purposes" onInputChange={handleInputChangeLX} Label = "Purposes"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5 justify-center'>
                            <div className='px-4'>
                              <FormEntry Name= "RSS" onInputChange={handleInputChangeLX} Label = "RSS"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Comments" onInputChange={handleInputChangeLX} Label = "Comments"/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
              </form>}

              {/* <----------- Form to Fill RSS Data --------------> */}

              {EntryDataType === 'RSS' && <form onSubmit={async(e) => {
                    e.preventDefault();

                    const MandatoryFields = ['Name', 'Phone', 'Email']

                    const isValid = MandatoryFields.every(field => rssValues[field].trim() !== '')

                    let DataMinusValidationsRSS = [...Object.values(rssValues)].slice(0,-1);

                    if(isValid){
                      const newRSS = {
                        TableName: 'RSS',
                        Data: DataMinusValidationsRSS
                      }

                      const token = localStorage.getItem('token'); // Retrieve token from localStorage
                      
                      await axios
                      .post('http://localhost:8070/add', newRSS, {
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
                        navigate('/ViewRSS');
                      })
                      .catch((err)=>{
                        console.log(err);
                        alert("Conflicting RSS Serial Number!")
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
                        <div className='flex items-stretch justify-center py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Name" onInputChange={handleInputChangeRSS} Label = "Name *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Email" onInputChange={handleInputChangeRSS} Label = "Email *"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Phone" onInputChange={handleInputChangeRSS} Label = "Phone *"/>
                            </div>
                        </div>
                        <div className='flex items-stretch py-5'>
                            <div className='px-4'>
                              <FormEntry Name= "Location" onInputChange={handleInputChangeRSS} Label = "Location"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "School" onInputChange={handleInputChangeRSS} Label = "School"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Head of School" onInputChange={handleInputChangeRSS} Label = "Head of School"/>
                            </div>
                            <div className='px-4'>
                              <FormEntry Name= "Purposes" onInputChange={handleInputChangeRSS} Label = "Purposes"/>
                            </div>
                        </div>
                    </div>
                    <div className='Buttons mt-12'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5">Submit</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-5">Cancel</button>
                    </div>
              </form>
              }
              </div>
            <Footer/>
        </div>
    )

}

export default AddItem;