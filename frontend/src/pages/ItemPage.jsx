import { useLocation } from "react-router-dom";
import {Navbar, Footer, FormEntry, Header, TableData, TableHeader, RsTable} from '../components/Index'
import { useState } from "react";


function ItemPage () {

    const location = useLocation();
    const {data} = location.state;

    const [curDiv, setCurDiv] = useState('Data');
    
    const toggleVisibility = (divName) => {
        setCurDiv(divName === curDiv ? null : divName);
    }

    const toggleEdit = () => {
        setInEdit(!inEdit)
    }

    const getTableID = () => {
    
        let Table_Id = {
            "TableName" : isRSdata ? "RS" : "RX",
            "Data" : Object.entries(data)
                        .filter(([key, value]) => 
                        key.startsWith("id"))
                        .map(([key, value]) => (
                            value.toString()
                        ))
        }

        return Table_Id;
    }

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

    const [rxValues, setRxValues] = useState({
        Make: '',
        Model: '',
        ['Serial no']: '',
        ['Equipment use']: '',
        Location: '',
        RSS: '',
        Custodian: '',
        ['Last seen']: '',
        ['RC notified']: '',
        ['Specs 1']: '',
        ['Specs 2']: '',
        ['Specs 3']: '',
        ['Specs 4']: '',
        Comments: '',
    })


    const setComments = (e) => {

        const value = e.target.value

        if(isRSdata){
            setRsValues((prevValues) => ({
                ...prevValues,
                Comments: value,
            }))    
        } else {
            setRxValues((prevValues) => ({
                ...prevValues,
                Comments: value,
            }))    
        }
    }

    const setSpecs = (key) => (e) => {

        const value = e.target.value

        if(!isRSdata){
            setRxValues((prevValues) => ({
                ...prevValues,
                [key]: value,
            }))   
        } 
    }

    const setData = (key) => (e) => {

        const value = e.target.value

        if(isRSdata){
            setRsValues((prevValues) => ({
                ...prevValues,
                [key]: value,
            }))    
        } else {
            setRxValues((prevValues) => ({
                ...prevValues,
                [key]: value,
            }))    
        }
    }

    const confirmDel = ()=>{
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          color: '#f8f9fa',
          background: '#6c757d',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
        if (result.isConfirmed) {
        deleteEntry();
        Swal.fire({  
            icon: 'success',
            title: 'Data Successfully Deleted',
            color: '#f8f9fa',
            background: '#6c757d',
            showConfirmButton: false,
            timer: 2000
        })
        isRSdata ? navigate('/ViewRS') : navigate('/ViewRX')
        }
    })
    };

    const deleteEntry = async () => {

        let Table_Id = getTableID();

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        await axios.delete(`http://localhost:8070/delete`, {
            data: Table_Id,
            headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },})
        .then((res) => {
            isRSdata ? navigate('/ViewRS') : navigate('/ViewRX')
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    const confirmEdit = ()=>{
        Swal.fire({
          title: 'Are you sure?',
          text: "All Changes Made Will Be Applied!",
          icon: 'warning',
          showCancelButton: true,
          color: '#f8f9fa',
          background: '#6c757d',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Edit!'
        })
        .then((result) => {
        if (result.isConfirmed) {
        submitEdit();
        Swal.fire({  
            icon: 'success',
            title: 'Data Successfully Edited',
            color: '#f8f9fa',
            background: '#6c757d',
            showConfirmButton: false,
            timer: 2000
        })
        navigate('/itempage', {state: {data: data}})
        }
    })
    };

    const submitEdit = async () => {

        let id = getTableID().Data;
        let tablename = isRSdata ? "RS" : "RX";

        const editData = {
            TableName: tablename,
            Data: id,
            NewData: Object.values(isRSdata ? rsValues : rxValues)
        }
        await axios
        .put(`http://localhost:8070/edit`, editData)
        .then((res) => {
            isRSdata ? navigate('/ViewRS') : navigate('/ViewRX')
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    const isRSdata = 'Isotope' in data;
    
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-grow bg-gray-100 dark:bg-gray-600">
                <div className="w-full max-w-7xl mx-auto mt-24">
                    <div class="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                        <div class="sm:hidden">
                            <label for="tabs" class="sr-only">Select tab</label>
                            <select id="tabs" class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Data</option>
                                <option>Specs</option>
                                <option>Comments</option>
                            </select>
                        </div>
                        <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                            <li class="w-full">
                                <button id="stats-tab" onClick={() => {toggleVisibility('Data')}} data-tabs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="true" class="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Data </button>
                            </li>
                        {!isRSdata && <li class="w-full">
                            <button id="about-tab" onClick={() => {toggleVisibility('Specs')}} data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" class="inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Specs</button>
                        </li>}
                            <li class="w-full">
                                <button id="faq-tab" onClick={() => {toggleVisibility('Comments')}} data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="false" class="inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Comments</button>
                            </li>
                        </ul>
                        <div id="fullWidthTabContent" class="border-t border-gray-200 dark:border-gray-600">
                            {curDiv === 'Data' && (<div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="num1" role="tabpanel" aria-labelledby="stats-tab">
                                <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                        {Object.entries(data).filter(([key, value]) =>
                                        typeof value === 'string' &&
                                        !key.startsWith("Spec") && 
                                        key !== "Comments" &&
                                        value.trim() !== "")
                                        .map(([key, value]) => (
                                            <div key={key} class="flex flex-col items-center justify-center">
                                                <dt class="mb-2 text-xl font-extrabold text-center">{value}</dt>
                                                <dd class="text-gray-500 dark:text-gray-400">{key}</dd>
                                            </div>
                                            ))}
                                </dl>
                            </div>)}
                            {curDiv === 'Specs' && (<div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="num2" role="tabpanel" aria-labelledby="about-tab">
                                <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Specifications for RX</h2>
                                <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
                                    {Object.entries(data).filter(([key, value]) => 
                                    typeof value === 'string' &&
                                    key.startsWith("Spec") && 
                                    value.trim() !== "")
                                    .map(([key, value]) => (
                                        <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                            <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                            </svg>
                                            <span class="leading-tight">{key} : {value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                            {curDiv === 'Comments' && (<div class="p-4 bg-white rounded-lg dark:bg-gray-800" id="num3" role="tabpanel" aria-labelledby="faq-tab">
                                <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                                    {Object.entries(data).filter(([key, _]) => key.startsWith("Comm")).map(([key, value]) => (
                                        <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                            <a href="#" class=" bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
                                            flex grow flex-col justify-center">
                                            {!isRSdata && <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">RX Comments</h5>}
                                            {isRSdata && <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">RS Comments</h5>}
                                            <p class="font-normal text-gray-700 dark:text-gray-50 max-w-full">{value}</p>
                                            </a>
                                        </li>
                                    ))}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

        
    )
}

export default ItemPage;