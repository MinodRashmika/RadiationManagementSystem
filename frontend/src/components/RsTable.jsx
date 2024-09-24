import {useNavigate} from "react-router-dom"
import React from "react";

const RsTable = ({Title, Headers, Info}) =>{

    const nav = useNavigate();

    const rowClick = (rowData) =>{
        nav('/ItemPage',{state: {data: rowData}})
    }

    return(
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        <th scope="col" class="px-6 py-3">
                            {Headers.H5}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H6}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H7}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H8}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H9}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H10}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H11}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H12}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {Headers.H13}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                        {Info.asset.map((data,key) => {
                            return(
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => {rowClick(data)}}>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data.Id}
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
                                    <td class="px-6 py-4">
                                        {data.Manufacturer}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Model}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data['Serial no']}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Location}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.RSS}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Custodian}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Last_Seen}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.RC_Notified}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Comments}
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