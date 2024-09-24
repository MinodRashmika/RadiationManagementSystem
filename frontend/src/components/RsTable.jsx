import {useNavigate} from "react-router-dom"
import {React, useState} from "react";

const RsTable = ({Title, Info}) =>{

    const nav = useNavigate();

    const rowClick = (rowData) =>{
        nav('/ItemPage',{state: {
            data: rowData,
            type: 'RS'
        }})
    }

    const [searchTerm, setSearchTerm] = useState("");

    return(
        <div className=" w-[100vw] h-[100vh] relative">
            <div class="absolute top-0 right-0 left-0 overflow-x-auto shadow-md sm:rounded-lg max-w-max m-auto">
                <div class="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <div>
                        {Title.mainTitle}
                        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{Title.title}</p>
                    </div>
                    <div>
                    <input type="search" className="px-4 py-2 border rounded-md w-full bg-white text-black" placeholder="Search" onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }} />
                    </div>
                </div>
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
            
                            {Info.asset.filter((item) => {
                                if(searchTerm == ""){
                                    return item;
                                } else if (item.Isotope.toString().toLowerCase().includes(searchTerm.toLowerCase())){
                                            return item;
                                         }
                            }).map((data,key) => {
                                return(
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => {rowClick(data)}}>
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
                                        <td class="px-6 py-4 hidden md:table-cell">
                                            {data.Last_Seen}
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

export default RsTable;