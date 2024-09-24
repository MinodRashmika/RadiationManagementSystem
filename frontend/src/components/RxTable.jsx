import {useNavigate} from "react-router-dom"
import React from "react";

const RxTable = ({Title, Headers, Info}) =>{

    const nav = useNavigate();

    const rowClick = (rowData) =>{
        nav('/ItemPage',{state: {data: rowData}})
    }

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
                <table id="RxTable" className= "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                            <th scope="col" className="px-6 py-3 w-[10vw]" >
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw]" >
                                Make
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw]">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw]">
                                Serial_No
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw] hidden md:table-cell">
                                Equipment_Use
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw] hidden md:table-cell">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3 w-[15vw] hidden md:table-cell">
                                Last Seen
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {Info.asset.filter((item) => {
                                if(searchTerm == ""){
                                    return item;
                                } else if (item.Make.toString().toLowerCase().includes(searchTerm.toLowerCase())){
                                            return item;
                                         }
                            }).map((data,key) => {
                                return(
                                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => {rowClick(data)}}>
                                        <th scope="row" className="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data.id}
                                        </th>
                                        <th scope="row" className="px-6 py-4 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-13">
                                            {data.Make}
                                        </th>
                                        <td className="px-6 py-4 items-center">
                                            {data.Model}
                                        </td>
                                        <td className="px-6 py-4 items-center">
                                            {data['Serial no']}
                                        </td>
                                        <td className="px-6 py-4 items-center hidden md:table-cell">
                                            {data['Equipment use']}
                                        </td>
                                        <td className="px-6 py-4 items-center hidden md:table-cell">
                                            {data.Location}
                                        </td>
                                        <td className="px-6 py-4 items-center hidden md:table-cell">
                                            {data['Last seen']}
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

export default RxTable;