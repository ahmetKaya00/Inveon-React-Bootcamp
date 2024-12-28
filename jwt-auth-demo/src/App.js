import React from 'react';
import { Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App(){
  return(
    <Routes>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
    </Routes>
  );
}

export default App;