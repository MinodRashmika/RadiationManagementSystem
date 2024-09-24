import {useNavigate} from "react-router-dom"
import React from "react";

const RsTable = ({Title, Headers, Info}) =>{

    const nav = useNavigate();

    const rowClick = (rowData) =>{
        nav('/ItemPage',{state: {data: rowData}})
    }

    return(
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-max m-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {Title.mainTitle}
                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{Title.title}</p>
                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3" >
                            {Headers.H0}
                        </th>
                        <th scope="col" class="px-6 py-3" >
                            {Headers.H1}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H2}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H3}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H4}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                        {Info.asset.map((data,key) => {
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
                                </tr>
                            )
                        })}
                       
                </tbody>
            </table>
        </div>
    )
}

export default RsTable;