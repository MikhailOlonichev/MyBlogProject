import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Login from "./pages/Login";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";


function App() {

    // const [data, setData] = useState(null);
//   //
//   // useEffect(() => {
//   //   axios.get('http://127.0.0.1:8000/api/test/')
//   //     .then(response => {
//   //       setData(response.data.data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
