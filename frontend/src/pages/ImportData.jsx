import {React, useState} from 'react'
import {Navbar, Footer} from '../components/Index';
import './pages.css'
import useDelayUnmount from '../components/DelayUnmount';
import axios from 'axios';
import Swal from 'sweetalert2';

const ImportData = () => {
    
    /* animation styles for div transitions in conditional rendering */
    const mountedAnimation = { animation: "inAnimation 250ms ease-in" };
    const unmountedAnimation = {
        animation: "outAnimation 270ms ease-out",
        animationFillMode: "forwards"
    }
    const [isStartBtnVisible, setIsStartBtnVisibile] = useState(true)
    const [isCancelBtnVisible, setIsCancelBtnVisibile] = useState(false)

    const [isSetupMounted, setIsSetupMounted] = useState(false)
    const [isCsvPathMounted, setIsCsvPathMounted] = useState(false)
    const [isTableNameMounted, setIsTableNameMounted] = useState(false)
    
    const showSetupDiv = useDelayUnmount(isSetupMounted, 250)
    const showCsvPathDiv = useDelayUnmount(isCsvPathMounted, 250)
    const showTableNameDiv = useDelayUnmount(isTableNameMounted, 250)

    const [PathName, setPathName] = useState('') 
    const [TableName, setTableName] = useState('')
    const [YesOrNo, SetYesOrNo] = useState(null)

    //Function to handle submitting user entries choices and data on importing data from CSV files
    const HandleSubmit = async (e) => {
        e.preventDefault();
        
        if (!TableName.trim()){
            alert("Please Enter a Table Name!");
            return;
        }
        
        const data = {
            PathName,
            TableName,
            YesOrNo
        }

        try{
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            const res = await axios.post("http://localhost:8070/3000sql", data,{
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the Authorization header
                  },
            })
            .then(
                //showing confirmation message that data was imported
                Swal.fire({  
                    icon: 'success',
                    title: 'Data Successfully Imoprted',
                    color: '#f8f9fa',
                    background: '#6c757d',
                    showConfirmButton: false,
                    timer: 2000
                })
            .finally(() => {
                //reloading page after to avoid re-clicking submit
                window.location.reload()
            })
            )

            

        } catch (error) {
            alert("error: ", error.message)
        }
    }

    
    return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center min-h-screen bg-gray-700'>
            <div className="text-white text-center flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Import Data Wizard</h1>
                    <p className="text-lg mb-8">Import Data from CSV to your Database</p>
                    <div>
                        {isStartBtnVisible && (<button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={() => {
                                setIsSetupMounted(true);
                                setIsStartBtnVisibile(false);
                                setIsCancelBtnVisibile(true);
                            }}
                        >Start Import</button>)}

                        {isCancelBtnVisible && (<button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >Cancel</button>)}

                    </div>
                </div>

                {showSetupDiv && (
                <div 
                className= "animatedDiv"
                style={isSetupMounted ? mountedAnimation : unmountedAnimation}
                > 
                    <h1 className='text-3xl font-bold mt-5'>Would you like to setup new database?</h1>
                    <p>THIS WILL ERASE/REPLACE YOUR CURRENT DATABASE</p>
                    <div className='flex gap-10 my-10 justify-center'>
                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={() => {
                                setIsCsvPathMounted(true);
                                setIsSetupMounted(false);
                                SetYesOrNo(true);
                            }}
                        >YES</button>
                        <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => {
                                setIsCsvPathMounted(true);
                                setIsSetupMounted(false);
                                SetYesOrNo(false);
                            }}
                        >NO</button>
                    </div>
                </div>)}

                {/* If yes or no is clicked, it will ask to enter path to csv, only difference is if it will delete existing databases */}

                {showCsvPathDiv && 
                (<div
                className='animatedDiv'
                style={isCsvPathMounted ? mountedAnimation : unmountedAnimation}
                >
                    <h1 className='text-3xl font-bold mt-5'>Enter the path to your CSV File</h1>
                    <div>
                        <label for="pathname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Path to CSV</label>
                        <input type="input" id="PathName" class="my-10 bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="C:/Desktop" 
                        onChange={(e) => {
                            setPathName(e.target.value)
                        }}
                        required 
                        />

                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={() => {
                                if (!PathName.trim()){
                                    alert("Please Enter a File Path to CSV File!");
                                    return;
                                }
                                setIsTableNameMounted(true);
                                setIsCsvPathMounted(false);
                                //create a function to send the filepath to backend
                            }}
                        > Confirm </button>
                    </div>
                </div>)}

                {showTableNameDiv && 
                (<div
                className='animatedDiv'
                style={isTableNameMounted ? mountedAnimation : unmountedAnimation}
                >
                    <h1 className='text-3xl font-bold mt-5'>Enter the Name of New Table</h1>
                    <div>
                        <input type="text" id="TableName" class="my-10 bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Table Name"
                        onChange={(e) => {
                            setTableName(e.target.value)
                        }}
                        required />

                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={HandleSubmit}
                        > Submit </button>
                    </div>
                </div>)}

                {/* write something to display a modal with success message */}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ImportData;