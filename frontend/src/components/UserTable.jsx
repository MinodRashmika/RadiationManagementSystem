import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ Title, users }) => {
  console.log('Received users:', users); // Log received users

  const navigate = useNavigate();

  const rowClick = (user) => {
    navigate('/UserPage', { state: { data: user } });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-max m-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {Title.mainTitle}
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{Title.title}</p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => rowClick(user)}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
