import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewAll from '../pages/ViewAll';
import Update from '../pages/Update';
import Add from './pages/Add'
import Delete from './pages/Delete'
import Login from './pages/Login'
import Main from './pages/Main'



function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/ViewAll" element={<ViewAll />} />
                <Route path="/Update" element={<Update />} /> 
                <Route path ="/Add" element={<Add />} />
                <Route path ="/Delete" element={<Delete />} />
                <Route path ="/Login" element={<Login />} />
                <Route path ="/Main" element={<Main />} />


            </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;
