import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { ViewRS, ViewRX, AddItem, ItemPage, ImportData, ViewArchive } from './pages/Index';
import { UpdateUser, AddUser, UserPage, ViewUsers } from './pages/Index';
import { Login, Main, Register } from './pages/Index';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  console.log("Is authenticated:", isAuthenticated);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Data Related Pages */}
        <Route path="/UpdateUser" element={<ProtectedRoute element={UpdateUser} />} />
        <Route path="/AddUser" element={<ProtectedRoute element={AddUser} />} />
        <Route path="/UserPage" element={<ProtectedRoute element={UserPage} />} />
        <Route path="/ViewUsers" element={<ProtectedRoute element={ViewUsers} />} />
        <Route path="/" element={<ProtectedRoute element={Main} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* Radiation Data Related Pages */}
        <Route path="/ViewRX" element={<ProtectedRoute element={ViewRX} />} />
        <Route path="/ViewRS" element={<ProtectedRoute element={ViewRS} />} />
        <Route path="/AddItem" element={<ProtectedRoute element={AddItem} />} />
        <Route path="/ItemPage" element={<ProtectedRoute element={ItemPage} />} />
        <Route path="/ImportData" element={<ProtectedRoute element={ImportData} />} />
        <Route path="/ViewArchive" element={<ProtectedRoute element={ViewArchive} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
