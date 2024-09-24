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

    const [fileInput, setFineInput] = useState(null) 
    const [TableName, setTableName] = useState('')


    //Function to handle submitting user entries choices and data on importing data from CSV files
    const HandleSubmit = async (e) => {
        e.preventDefault();
        
        if (!TableName.trim()){
            alert("Please Enter a Table Name!");
            return;
        }

        if (!fileInput) {
            alert("Please select a file to upload!");
            return;
        }


        let formData = new FormData();
        formData.append('file', fileInput);
        formData.append('tablename', TableName);

        try{
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            const res = await axios.post("http://localhost:8070/upload", formData,{
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

    const handleFileInput = (e) => {
        setFineInput(e.target.files[0]);
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
                                setIsCsvPathMounted(true);
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

                {/* If yes or no is clicked, it will ask to enter path to csv, only difference is if it will delete existing databases */}

                {showCsvPathDiv && 
                (<div
                className='animatedDiv'
                style={isCsvPathMounted ? mountedAnimation : unmountedAnimation}
                >
                    <h1 className='text-3xl font-bold mt-5'>Open Your CSV File</h1>
                    <div>
                    <form id="uploadForm" enctype="multipart/form-data" className='py-5'
                    onSubmit={HandleSubmit}>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                id="file_input" 
                                type="file"
                                onChange={handleFileInput}/>
                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLSX, XSL, or CSV (Max 10MB)</p>
                            <input type="input" id="tablename" className=" placeholder:text-center bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="RX / RS / LS / LX / RSS" 
                            onChange={(e) => {
                                setTableName(e.target.value)
                            }}
                            required 
                            />
                            <p class="mt-1 mb-10 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Enter Table Name</p>


                            <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            > Confirm </button>
                    </form>
                    </div>
                </div>)}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ImportData;