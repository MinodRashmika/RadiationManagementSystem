import { useLocation, useNavigate } from "react-router-dom";
import {Navbar, Footer, FormEntry, Header, TableData, TableHeader, RsTable} from '../components/Index'
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Navigate } from "react-router-dom";


function ItemPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const {data} = location.state ?? {}
    const type = location.state.type

    const [curDiv, setCurDiv] = useState('Data');
    const [inEdit, setInEdit] = useState(false)
    
    const toggleVisibility = (divName) => {
        setCurDiv(divName === curDiv ? null : divName);
    }

    const toggleEdit = () => {
        setInEdit(!inEdit)
    }

    const getTableID = () => {
        let Table_Id = {
            "TableName" : type,
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
        RSS:'',
        Comments: ''
      })

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
        RSS:'',
        Comments: ''
      })

      const [rssValues, setRssValues] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Location: '',
        School: '',
        ['Head of School']: '',    
        Purposes: ''    
      })

    const setComments = (e) => {

        const value = e.target.value
        console.log("HE",value)
        switch(type) {
            case 'RX':
                setRxValues((prevValues) => ({
                    ...prevValues,
                    Comments: value,
                }));
            case 'RS':
                setRsValues((prevValues) => ({
                    ...prevValues,
                    Comments: value,
                }));
            case 'LS':
                setLsValues((prevValues) => ({
                    ...prevValues,
                    Comments: value,
                }));
            case 'LX':
                setLxValues((prevValues) => ({
                    ...prevValues,
                    Comments: value,
                }));
        }
    }

    const setSpecs = (key) => (e) => {

        const value = e.target.value

        if(type=='RX'){
            setRxValues((prevValues) => ({
                ...prevValues,
                [key]: value,
            }))   
        } 
    }

    const setData = (key) => (e) => {

        const value = e.target.value

        switch(type) {
            case 'RX':
                setRxValues((prevValues) => ({
                    ...prevValues,
                    [key]: value,
                }))
            case 'RS':
                setRsValues((prevValues) => ({
                    ...prevValues,
                    [key]: value,
                }))
            case 'LS':
                setLsValues((prevValues) => ({
                    ...prevValues,
                    [key]: value,
                }))
            case 'LX':
                setLxValues((prevValues) => ({
                    ...prevValues,
                    [key]: value,
                }))
            case 'RSS':
                setRssValues((prevValues) => ({
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
        switch(type){
            case 'RX':
                navigate('/ViewRX')
                break;
            case 'RS':
                navigate('/ViewRS')
                break;
            case 'LS':
                navigate('/ViewLS')
                break;
            case 'LX':
                navigate('/ViewLX')
                break;
            case 'RSS':
                navigate('/ViewRSS')
                break;
            default:
                navigate('/')
        }
        }
    })
    };
    const deleteEntry = async () => {

        let Table_Id = getTableID();
        let type = location.state.type
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        await axios.delete(`http://localhost:8070/delete`, {
            data: Table_Id,
            headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },})
        .then((res) => {
            switch(type){
                case 'RX':
                    navigate('/ViewRX')
                    break;
                case 'RS':
                    navigate('/ViewRS')
                    break;
                case 'LS':
                    navigate('/ViewLS')
                    break;
                case 'LX':
                    navigate('/ViewLX')
                    break;
                case 'RSS':
                    navigate('/ViewRSS')
                    break;
                default:
                    navigate('/')
            }
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
        let tablename = type

        let newdata = () =>{
            switch(tablename){
                case 'RX':
                    return rxValues;
                case 'RS':
                    return rsValues;
                case 'LS':
                    return lsValues;
                case 'LX':
                    return lxValues;
                case 'RSS':
                    return rssValues;
                default:
                    return null;
        }}

        const editData = {
            TableName: tablename,
            Data: id,
            NewData: Object.values(newdata())
        }
        const token = localStorage.getItem('token');
    
        await axios
            .put(`http://localhost:8070/edit`, editData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                switch(tablename){
                case 'RX':
                    navigate('/ViewRX')
                    break;
                case 'RS':
                    navigate('/ViewRS')
                    break;
                case 'LS':
                    navigate('/ViewLS')
                    break;
                case 'LX':
                    navigate('/ViewLX')
                    break;
                case 'RSS':
                    navigate('/ViewRSS')
                    break;
                default:
                    navigate('/')
            }
            })
            .catch((err) => {
                alert(err.message)
            });
    }
    
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            {!inEdit && (<div className="flex-grow bg-gray-100 dark:bg-gray-600">
                <div className="w-full max-w-7xl mx-auto mt-24 mb-24">
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
                        {type =='RX' && <li class="w-full">
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
                                            <span class=" bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
                                            flex grow flex-col justify-center">
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{type} Comments</h5>
                                            <p class="font-normal text-gray-700 dark:text-gray-50 max-w-full">{value}</p>
                                            </span>
                                        </li>
                                    ))}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>

                <div className="flex max-w-7xl mx-auto mb-10 justify-around">
                    <button type="button" class="text-slate-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-slate-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-700 dark:hover:bg-gray-800"
                    onClick={()=> {
                        toggleEdit()
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-5">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                    Edit Entry
                    </button>
                    <button type="button" class=" text-slate-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-700 dark:hover:bg-gray-800"
                    onClick={confirmDel}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-5">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                    Delete Now
                    </button>
                </div>
            </div>)}

            {/* Conditionally rendering if edit button is clicked, same as prev but with input boxes and placeholders */}
            {inEdit && (
                <div className="flex-grow bg-gray-100 dark:bg-gray-600">
                <div className="w-full max-w-7xl mx-auto mt-24 mb-24">
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
                        {type =='RX' && <li class="w-full">
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
                                                <input type="text" 
                                                id={`data_item_${key}`}
                                                onInput={setData(key)}
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-grey-200 placeholder:text-center  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder= {value} />
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
                                        <li key={key} class="flex space-x-2 rtl:space-x-reverse items-center">
                                            <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                            </svg>
                                            <div className="flex">
                                                <span class="leading-tight mx-10">{key}</span>
                                                <input type="text"
                                                id={`spec_item_${key}`}
                                                name="Specs" 
                                                onInput={setSpecs(key)} 
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-grey-200 placeholder:text-center  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder= {value} />
                                            </div>
                                            
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                            {curDiv === 'Comments' && (<div class="p-4 bg-white rounded-lg dark:bg-gray-800" id="num3" role="tabpanel" aria-labelledby="faq-tab">
                                <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                                    {Object.entries(data).filter(([key, value]) => 
                                    typeof value === 'string' &&
                                    key.startsWith("Comm") && 
                                    value.trim() !== "")
                                    .map(([key, value]) => (
                                        <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                            <span class=" bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
                                            flex grow flex-col justify-center">
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{type}Comments</h5>
                                            <input type="text" id="comment_item" name="Comments" onInput={setComments} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-grey-200 placeholder:text-center  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder= {value} />
                                            </span>
                                        </li>
                                    ))}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>

                <div className="flex max-w-7xl mx-auto mb-10 justify-around">
                    <button type="button" class=" text-slate-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-700 dark:hover:bg-gray-800"
                    onClick={confirmEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-5">
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                        </svg>
                        Save Edits
                    </button>
                    <button type="button" class=" text-slate-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-700 dark:hover:bg-gray-800"
                    onClick={toggleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-5">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    Cancel Edits
                    </button>
                </div>

                

            </div>
            )}
            <Footer/>
        </div>
    )
}

export default ItemPage;