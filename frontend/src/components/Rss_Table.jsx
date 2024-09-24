import {useNavigate} from "react-router-dom"
import React, { useState } from "react";
import SearchFunc from "./SearchBar";

const RssTable = ({Title, Info}) =>{

    const nav = useNavigate();

    const rowClick = (rowData) =>{
        nav('/ItemPage',{state: {
            data: rowData,
            type: 'RSS'
        }})
    }

    const [searchTerm, setSearchTerm] = useState("");
    return(
        <div className=" w-[100vw] h-[100vh] relative">
            <div className="absolute top-0 right-0 left-0 overflow-x-auto shadow-md sm:rounded-lg max-w-max m-auto">
                <div className="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <div>
                        {Title.mainTitle}
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{Title.title}</p>
                    </div>
                    <div>
                    <input type="search" className="px-4 py-2 border rounded-md w-full bg-white text-black" placeholder="Search" onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }} />
                    </div>
                </div>
                <table id="RssTable" className= "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                            <th scope="col" className="px-6 py-3 w-[10vw]" >
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 w-[10vw]" >
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw]" >
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw]">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw]">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw] hidden md:table-cell">
                                School
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw] hidden md:table-cell">
                                Head of School
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw] hidden md:table-cell">
                                Purposes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {Info.asset.filter((person) => {
                                if(searchTerm == ""){
                                    return person;
                                } else if (person.Name.toString().toLowerCase().includes(searchTerm.toLowerCase())){
                                            return person;
                                         }
                            }).map((data,key) => {
                                console.log(data)
                                return(
                                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => {rowClick(data)}}>
                                        <th scope="row" className="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data.id}
                                        </th>
                                        <th scope="row" className="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data.Name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-13">
                                            {data.Email}
                                        </th>
                                        <td className="px-6 py-4 items-center">
                                            {data.Phone}
                                        </td>
                                        <td className="px-6 py-4 items-center">
                                            {data.Location}
                                        </td>
                                        <td className="px-6 py-4 items-center hidden md:table-cell">
                                            {data.School}
                                        </td>
                                        <td className="px-6 py-4 items-center hidden md:table-cell">
                                            {data['Head of School']}
                                        </td>
                                        <td className="px-6 py-4 items-center hidden md:table-cell">
                                            {data.Purposes}
                                        </td>
                                    </tr>
                                )
                            })}
            
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RssTable;