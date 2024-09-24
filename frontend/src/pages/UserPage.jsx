import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Footer } from '../components/Index';
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function UserPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;

    const [curDiv, setCurDiv] = useState('Data');

    const toggleVisibility = (divName) => {
        setCurDiv(divName === curDiv ? null : divName);
    };

    const confirmDel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEntry()
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Data Successfully Deleted',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/ViewUsers'); // Redirect to ViewUsers after deletion
                    })
                    .catch((error) => {
                        console.error('Error deleting entry:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong while deleting the data!',
                        });
                    });
            }
        });
    };

    const deleteEntry = async () => {
        let Table_Id = {
            "TableName": "users", // Change the TableName to "Users"
            "Data": Object.entries(data)
                .filter(([key, value]) =>
                    key.startsWith("id"))
                .map(([key, value]) => (
                    value.toString()
                ))
        };
    
        console.log("Data : ", Table_Id);
    
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            await axios.delete(`http://localhost:8070/deletedata`, {
                data: Table_Id,
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the Authorization header //cite chatgpt for how to include token in header
                },})
                } catch (err) {
            alert(err.message);
            return;
        }
    
        // Deletion successful
    };

    const handleEdit = () => {
        console.log("User data:", data); // Log userData to the console

        navigate('/UpdateUser', { state: { userData: data } });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow bg-gray-100 dark:bg-gray-600">
                <div className="w-full max-w-7xl mx-auto mt-24 mb-24">
                    <div class="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                        <div id="fullWidthTabContent" class="border-t border-gray-200 dark:border-gray-600">
                            {curDiv === 'Data' && (<div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="num1" role="tabpanel" aria-labelledby="stats-tab">
                                <dl class="grid max-w-screen-xl grid-cols-1 md:grid-cols-2 gap-8 p-4 mx-auto text-gray-900 dark:text-white sm:p-8">
                                        {Object.entries(data).filter(([key, value]) =>
                                        typeof value === 'string' &&
                                        !key.startsWith("Spec") &&
                                        key !== "Comments" &&
                                        value.trim() !== ""
                                        ).map(([key, value]) => (
                                            <div key={key} class="flex flex-col items-start justify-start">
                                                <dt class="mb-2 text-xl font-extrabold">{key}</dt>
                                                <dd class="text-gray-500 dark:text-gray-400">
                                                    {key.toLowerCase().includes('password') ? '*************' : value}
                                                </dd>
                                            </div>
                                            ))}
                                </dl>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex max-w-7xl mx-auto justify-around">
                    <button type="button" class="text-slate-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-slate-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-700 dark:hover:bg-gray-800"
                        onClick={handleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-5">
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                        Edit Entry
                    </button>
                    <button type="button" class=" text-slate-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-700 dark:hover:bg-gray-800"
                        onClick={confirmDel}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-5">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                        Delete Now
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserPage;
